
import { supabase } from "@/integrations/supabase/client";
import { Emotion, ResonanceType, Theme, Whisper, WhisperMode } from "@/types";

export const getWhispers = async (filters?: {
  emotion?: Emotion;
  theme?: Theme;
  mode?: WhisperMode;
}): Promise<Whisper[]> => {
  try {
    let query = supabase
      .from("whispers")
      .select("*");

    if (filters?.emotion) {
      query = query.eq("emotion", filters.emotion);
    }

    if (filters?.theme) {
      query = query.eq("theme", filters.theme);
    }

    if (filters?.mode) {
      query = query.eq("mode", filters.mode);
    }

    const { data, error } = await query.order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching whispers:", error);
      throw error;
    }

    // Ottieni i conteggi delle risonanze per ogni tipo
    const whisperIds = data.map(whisper => whisper.id);
    const { data: resonances, error: resonancesError } = await supabase
      .from("resonances")
      .select("whisper_id, type")
      .in("whisper_id", whisperIds);

    if (resonancesError) {
      console.error("Error fetching resonances:", resonancesError);
      throw resonancesError;
    }

    // Ottieni tutte le risposte per i whisper
    const { data: responses, error: responsesError } = await supabase
      .from("responses")
      .select("*")
      .in("whisper_id", whisperIds);

    if (responsesError) {
      console.error("Error fetching responses:", responsesError);
      throw responsesError;
    }

    // Raggruppa risonanze per whisper_id e tipo
    const resonancesByWhisper: Record<number, Record<string, number>> = {};
    resonances.forEach(r => {
      if (!resonancesByWhisper[r.whisper_id]) {
        resonancesByWhisper[r.whisper_id] = {};
      }
      if (!resonancesByWhisper[r.whisper_id][r.type]) {
        resonancesByWhisper[r.whisper_id][r.type] = 0;
      }
      resonancesByWhisper[r.whisper_id][r.type]++;
    });

    // Raggruppa risposte per whisper_id
    const responsesByWhisper: Record<number, any[]> = {};
    responses.forEach(r => {
      if (!responsesByWhisper[r.whisper_id]) {
        responsesByWhisper[r.whisper_id] = [];
      }
      responsesByWhisper[r.whisper_id].push({
        id: r.id,
        content: r.content,
        createdAt: new Date(r.created_at)
      });
    });

    return data.map(whisper => {
      const whisperResonances = resonancesByWhisper[whisper.id] || {};
      
      // Crea un array di risonanze con i conteggi
      const resonanceArray = Object.entries(whisperResonances).map(
        ([type, count]) => ({
          type: type as ResonanceType,
          count: count as number
        })
      );

      return {
        id: whisper.id,
        content: whisper.content,
        emotion: whisper.emotion as Emotion,
        theme: whisper.theme as Theme,
        createdAt: new Date(whisper.created_at),
        audioUrl: whisper.audio_url || "",
        resonanceCount: whisper.resonance_count || 0,
        resonances: resonanceArray,
        mode: (whisper.mode || "standard") as WhisperMode,
        isWhisperOfDay: whisper.is_whisper_of_day || false,
        responses: responsesByWhisper[whisper.id] || []
      };
    });
  } catch (error) {
    console.error("Error in getWhispers:", error);
    throw error;
  }
};

// Create an audio file upload function
export const uploadAudio = async (audioBlob: Blob): Promise<string | null> => {
  try {
    const fileName = `audio-${Date.now()}.webm`;
    const { data, error } = await supabase
      .storage
      .from('audio')
      .upload(fileName, audioBlob, {
        contentType: 'audio/webm',
        cacheControl: '3600'
      });

    if (error) {
      console.error("Error uploading audio:", error);
      throw error;
    }

    // Get the public URL
    const { data: { publicUrl } } = supabase
      .storage
      .from('audio')
      .getPublicUrl(fileName);

    return publicUrl;
  } catch (error) {
    console.error("Error in uploadAudio:", error);
    return null;
  }
};

export const createWhisper = async (whisperData: {
  content: string;
  emotion?: Emotion;
  theme?: Theme;
  audioUrl?: string;
  mode?: WhisperMode;
}): Promise<Whisper> => {
  try {
    const { content, emotion, theme, audioUrl, mode = "standard" } = whisperData;
    
    const { data, error } = await supabase
      .from("whispers")
      .insert({
        content,
        emotion: emotion as string | null,
        theme: theme as string | null,
        audio_url: audioUrl,
        mode: mode as string,
        resonance_count: 0
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating whisper:", error);
      throw error;
    }

    return {
      id: data.id,
      content: data.content,
      emotion: data.emotion as Emotion,
      theme: data.theme as Theme,
      createdAt: new Date(data.created_at),
      audioUrl: data.audio_url || "",
      resonanceCount: 0,
      resonances: [],
      mode: (data.mode || "standard") as WhisperMode,
      isWhisperOfDay: data.is_whisper_of_day || false,
      responses: []
    };
  } catch (error) {
    console.error("Error in createWhisper:", error);
    throw error;
  }
};

export const addResonance = async (
  whisperId: number,
  type: ResonanceType
): Promise<void> => {
  try {
    const { error } = await supabase
      .from("resonances")
      .insert({
        whisper_id: whisperId,
        type
      });

    if (error) {
      console.error("Error adding resonance:", error);
      throw error;
    }

    // Aggiorna il conteggio delle risonanze nel whisper
    const { error: updateError } = await supabase.rpc(
      "increment_resonance_count",
      { whisper_id: whisperId }
    );

    if (updateError) {
      console.error("Error updating resonance count:", updateError);
      throw updateError;
    }
  } catch (error) {
    console.error("Error in addResonance:", error);
    throw error;
  }
};

export const addResponse = async (
  whisperId: number,
  content: string
): Promise<void> => {
  try {
    const { error } = await supabase
      .from("responses")
      .insert({
        whisper_id: whisperId,
        content
      });

    if (error) {
      console.error("Error adding response:", error);
      throw error;
    }
  } catch (error) {
    console.error("Error in addResponse:", error);
    throw error;
  }
};
