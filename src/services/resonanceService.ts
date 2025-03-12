
import { supabase } from "@/integrations/supabase/client";
import { ResonanceType } from "@/types";

export const addResonance = async (
  whisperId: number,
  type: ResonanceType
): Promise<void> => {
  try {
    const { error } = await supabase
      .from("resonances")
      .insert({
        whisper_id: whisperId,
        type: type
      });

    if (error) {
      console.error("Error adding resonance:", error);
      throw error;
    }

    // Aggiorna il conteggio delle risonanze nel whisper
    const { error: updateError } = await supabase.rpc(
      "increment_resonance_count", 
      { whisper_id: whisperId } as { whisper_id: number }
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

export const getResonancesForWhispers = async (whisperIds: number[]) => {
  try {
    const { data: resonances, error: resonancesError } = await supabase
      .from("resonances")
      .select("whisper_id, type")
      .in("whisper_id", whisperIds);

    if (resonancesError) {
      console.error("Error fetching resonances:", resonancesError);
      throw resonancesError;
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

    return resonancesByWhisper;
  } catch (error) {
    console.error("Error in getResonancesForWhispers:", error);
    throw error;
  }
};
