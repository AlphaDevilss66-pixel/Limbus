
import { supabase } from "@/integrations/supabase/client";
import { Emotion, ResonanceType, Theme, Whisper, WhisperMode, WhisperResponse } from "@/types";

export const fetchWhispers = async (): Promise<Whisper[]> => {
  const { data: whispers, error } = await supabase
    .from("whispers")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching whispers:", error);
    throw error;
  }

  // Fetch resonances for each whisper
  const whispersWithResonances = await Promise.all(
    whispers.map(async (whisper) => {
      const { data: resonances, error: resonancesError } = await supabase
        .from("resonances")
        .select("type")
        .eq("whisper_id", whisper.id);

      if (resonancesError) {
        console.error("Error fetching resonances:", resonancesError);
      }

      // Count resonances by type
      const resonancesByType = resonances?.reduce((acc, r) => {
        acc[r.type as ResonanceType] = (acc[r.type as ResonanceType] || 0) + 1;
        return acc;
      }, {} as Record<ResonanceType, number>) || {};

      // Format resonances for the Whisper type
      const formattedResonances = Object.entries(resonancesByType).map(([type, count]) => ({
        type: type as ResonanceType,
        count,
      }));

      // Fetch responses for the whisper
      const { data: responses, error: responsesError } = await supabase
        .from("responses")
        .select("*")
        .eq("whisper_id", whisper.id)
        .order("created_at", { ascending: true });

      if (responsesError) {
        console.error("Error fetching responses:", responsesError);
      }

      // Format responses for the Whisper type
      const formattedResponses = responses?.map((response) => ({
        id: response.id,
        content: response.content,
        createdAt: new Date(response.created_at),
        parentId: whisper.id,
      })) || [];

      return {
        id: whisper.id,
        content: whisper.content || "",
        emotion: whisper.emotion as Emotion,
        theme: whisper.theme as Theme,
        createdAt: new Date(whisper.created_at),
        audioUrl: whisper.audio_url,
        resonanceCount: whisper.resonance_count,
        resonances: formattedResonances,
        mode: whisper.mode as WhisperMode,
        isWhisperOfDay: whisper.is_whisper_of_day,
        responses: formattedResponses,
      };
    })
  );

  return whispersWithResonances;
};

export const createWhisper = async (whisper: {
  content: string;
  emotion?: Emotion;
  theme?: Theme;
  audioUrl?: string;
  mode: WhisperMode;
}): Promise<number> => {
  const { data, error } = await supabase
    .from("whispers")
    .insert({
      content: whisper.content,
      emotion: whisper.emotion,
      theme: whisper.theme,
      audio_url: whisper.audioUrl,
      mode: whisper.mode,
      resonance_count: 0,
    })
    .select("id")
    .single();

  if (error) {
    console.error("Error creating whisper:", error);
    throw error;
  }

  return data.id;
};

export const uploadAudio = async (audioBlob: Blob): Promise<string> => {
  const fileName = `${Date.now()}.wav`;
  const { data, error } = await supabase.storage
    .from("audio")
    .upload(fileName, audioBlob);

  if (error) {
    console.error("Error uploading audio:", error);
    throw error;
  }

  const { data: publicUrl } = supabase.storage.from("audio").getPublicUrl(fileName);
  return publicUrl.publicUrl;
};

export const addResonance = async (whisperId: number, type: ResonanceType): Promise<void> => {
  const { error } = await supabase.from("resonances").insert({
    whisper_id: whisperId,
    type,
  });

  if (error) {
    console.error("Error adding resonance:", error);
    throw error;
  }

  // Update the resonance count in the whispers table
  const { error: updateError } = await supabase.rpc("increment_resonance_count", {
    whisper_id: whisperId,
  });

  if (updateError) {
    console.error("Error updating resonance count:", updateError);
    // Continue even if the count update fails
  }
};

export const addResponse = async (
  whisperId: number,
  content: string
): Promise<WhisperResponse> => {
  const { data, error } = await supabase
    .from("responses")
    .insert({
      whisper_id: whisperId,
      content,
    })
    .select("*")
    .single();

  if (error) {
    console.error("Error adding response:", error);
    throw error;
  }

  return {
    id: data.id,
    content: data.content,
    createdAt: new Date(data.created_at),
    parentId: data.whisper_id,
  };
};

export const setWhisperOfDay = async (whisperId: number): Promise<void> => {
  // First reset existing whisper of the day
  const { error: resetError } = await supabase
    .from("whispers")
    .update({ is_whisper_of_day: false })
    .eq("is_whisper_of_day", true);

  if (resetError) {
    console.error("Error resetting whisper of the day:", resetError);
    // Continue even if reset fails
  }

  // Set new whisper of the day
  const { error } = await supabase
    .from("whispers")
    .update({ is_whisper_of_day: true })
    .eq("id", whisperId);

  if (error) {
    console.error("Error setting whisper of the day:", error);
    throw error;
  }
};
