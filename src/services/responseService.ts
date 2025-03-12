
import { supabase } from "@/integrations/supabase/client";
import { WhisperResponse } from "@/types";

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

export const getResponsesForWhispers = async (whisperIds: number[]) => {
  try {
    const { data: responses, error: responsesError } = await supabase
      .from("responses")
      .select("*")
      .in("whisper_id", whisperIds);

    if (responsesError) {
      console.error("Error fetching responses:", responsesError);
      throw responsesError;
    }

    // Raggruppa risposte per whisper_id
    const responsesByWhisper: Record<number, WhisperResponse[]> = {};
    responses.forEach(r => {
      if (!responsesByWhisper[r.whisper_id]) {
        responsesByWhisper[r.whisper_id] = [];
      }
      responsesByWhisper[r.whisper_id].push({
        id: r.id,
        content: r.content,
        createdAt: new Date(r.created_at),
        parentId: r.whisper_id
      });
    });

    return responsesByWhisper;
  } catch (error) {
    console.error("Error in getResponsesForWhispers:", error);
    throw error;
  }
};
