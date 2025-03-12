
import { supabase } from "@/integrations/supabase/client";
import { Emotion, ResonanceType, Theme, Whisper, WhisperMode } from "@/types";
import { getResonancesForWhispers } from "./resonanceService";
import { getResponsesForWhispers } from "./responseService";
import { uploadAudio } from "./audioService";

export { addResonance } from "./resonanceService";
export { addResponse } from "./responseService";
export { uploadAudio } from "./audioService";

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

    // Ottieni i conteggi delle risonanze e delle risposte per tutti i whisper
    const whisperIds = data.map(whisper => whisper.id);
    
    const resonancesByWhisper = await getResonancesForWhispers(whisperIds);
    const responsesByWhisper = await getResponsesForWhispers(whisperIds);

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
        emotion: emotion || null,
        theme: theme || null,
        audio_url: audioUrl,
        mode,
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
