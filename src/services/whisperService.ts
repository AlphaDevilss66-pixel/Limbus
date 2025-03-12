
import { supabase } from "@/integrations/supabase/client";
import { Emotion, ResonanceType, Theme, Whisper, WhisperMode, WhisperSpecialType } from "@/types";
import { getResonancesForWhispers } from "./resonanceService";
import { getResponsesForWhispers } from "./responseService";
import { uploadAudio } from "./audioService";
import { toast } from "sonner";

export { addResonance } from "./resonanceService";
export { uploadAudio } from "./audioService";
export { addResponse } from "./responseService";

export const getWhispers = async (filters?: {
  emotion?: Emotion;
  theme?: Theme;
  mode?: WhisperMode;
  specialType?: WhisperSpecialType;
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

    if (filters?.specialType) {
      query = query.eq("special_type", filters.specialType);
    } else {
      // By default, only show normal whispers and destiny whispers that are released
      query = query.or('special_type.is.null,and(special_type.eq.destino,release_date.lte.now()),and(special_type.eq.tempo,release_date.lte.now()),special_type.eq.passato');
    }

    const { data, error } = await query.order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching whispers:", error);
      throw error;
    }

    if (!data || data.length === 0) {
      return [];
    }

    const whisperIds = data.map(whisper => whisper.id);
    const resonancesByWhisper = await getResonancesForWhispers(whisperIds);
    const responsesByWhisper = await getResponsesForWhispers(whisperIds);

    return data.map(whisper => ({
      id: whisper.id,
      content: whisper.content,
      emotion: whisper.emotion as Emotion,
      theme: whisper.theme as Theme,
      createdAt: new Date(whisper.created_at),
      audioUrl: whisper.audio_url || "",
      resonanceCount: whisper.resonance_count || 0,
      resonances: Object.entries(resonancesByWhisper[whisper.id] || {}).map(
        ([type, count]) => ({
          type: type as ResonanceType,
          count: count as number
        })
      ),
      mode: (whisper.mode || "standard") as WhisperMode,
      isWhisperOfDay: whisper.is_whisper_of_day || false,
      responses: responsesByWhisper[whisper.id] || [],
      specialType: whisper.special_type as WhisperSpecialType || undefined,
      releaseDate: whisper.release_date ? new Date(whisper.release_date) : undefined,
      isSecret: whisper.is_secret || false
    }));
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
  specialType?: WhisperSpecialType;
  releaseDate?: Date;
  isSecret?: boolean;
}): Promise<Whisper> => {
  try {
    const { 
      content, 
      emotion, 
      theme, 
      audioUrl, 
      mode = "standard", 
      specialType,
      releaseDate,
      isSecret
    } = whisperData;
    
    const { data, error } = await supabase
      .from("whispers")
      .insert({
        content,
        emotion: emotion || null,
        theme: theme || null,
        audio_url: audioUrl,
        mode: mode as string,
        resonance_count: 0,
        special_type: specialType || null,
        release_date: releaseDate || null,
        is_secret: isSecret || false
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
      responses: [],
      specialType: data.special_type as WhisperSpecialType || undefined,
      releaseDate: data.release_date ? new Date(data.release_date) : undefined,
      isSecret: data.is_secret || false
    };
  } catch (error) {
    console.error("Error in createWhisper:", error);
    throw error;
  }
};

// Function to check if user has shared a whisper (required for accessing the invisible library)
export const hasSharedWhisper = async (): Promise<boolean> => {
  try {
    const { count, error } = await supabase
      .from("whispers")
      .select('*', { count: 'exact', head: true });
    
    if (error) {
      console.error("Error checking if user has shared whispers:", error);
      return false;
    }
    
    return (count || 0) > 0;
  } catch (error) {
    console.error("Error in hasSharedWhisper:", error);
    return false;
  }
};

// Function to get whispers from the invisible library
export const getLibraryWhispers = async (): Promise<Whisper[]> => {
  // First check if user has shared a whisper
  const hasShared = await hasSharedWhisper();
  
  if (!hasShared) {
    toast.error("Devi condividere almeno un sussurro per accedere alla biblioteca");
    return [];
  }
  
  return getWhispers({ specialType: "biblioteca" });
};

// Function to get whispers from the past
export const getPastWhispers = async (): Promise<Whisper[]> => {
  return getWhispers({ specialType: "passato" });
};

// Function to create a destiny whisper
export const createDestinyWhisper = async (whisperData: {
  content: string;
  emotion?: Emotion;
  theme?: Theme;
  audioUrl?: string;
  mode?: WhisperMode;
}): Promise<Whisper> => {
  // Calculate a random release date between now and 6 months in the future
  const now = new Date();
  const futureDate = new Date();
  futureDate.setMonth(now.getMonth() + Math.floor(Math.random() * 6));
  
  return createWhisper({
    ...whisperData,
    specialType: "destino",
    releaseDate: futureDate
  });
};

// Function to create a time capsule whisper
export const createTimeCapsuleWhisper = async (whisperData: {
  content: string;
  emotion?: Emotion;
  theme?: Theme;
  audioUrl?: string;
  mode?: WhisperMode;
  releaseYears: number;
}): Promise<Whisper> => {
  const releaseDate = new Date();
  releaseDate.setFullYear(releaseDate.getFullYear() + whisperData.releaseYears);
  
  const { releaseYears, ...restData } = whisperData;
  
  return createWhisper({
    ...restData,
    specialType: "tempo",
    releaseDate: releaseDate
  });
};

// Function to create a secret whisper for the invisible library
export const createSecretWhisper = async (whisperData: {
  content: string;
  emotion?: Emotion;
  theme?: Theme;
  audioUrl?: string;
  mode?: WhisperMode;
}): Promise<Whisper> => {
  return createWhisper({
    ...whisperData,
    specialType: "biblioteca",
    isSecret: true
  });
};
