
import { supabase } from "@/integrations/supabase/client";
import { WhisperResponse } from "@/types";

export const getResponsesForWhispers = async (whisperIds: number[]): Promise<Record<number, WhisperResponse[]>> => {
  try {
    const { data, error } = await supabase
      .from("responses")
      .select("*")
      .in("whisper_id", whisperIds);

    if (error) {
      console.error("Error fetching responses:", error);
      throw error;
    }

    if (!data || data.length === 0) {
      return {};
    }

    // Group responses by whisper_id
    return data.reduce((acc, response) => {
      const whisperId = response.whisper_id as number;
      if (!acc[whisperId]) {
        acc[whisperId] = [];
      }
      acc[whisperId].push({
        id: response.id,
        content: response.content,
        createdAt: new Date(response.created_at),
        parentId: whisperId
      });
      return acc;
    }, {} as Record<number, WhisperResponse[]>);
  } catch (error) {
    console.error("Error in getResponsesForWhispers:", error);
    throw error;
  }
};

export const addResponse = async (whisperId: number, content: string): Promise<WhisperResponse> => {
  try {
    const { data, error } = await supabase
      .from("responses")
      .insert({
        whisper_id: whisperId,
        content
      })
      .select()
      .single();

    if (error) {
      console.error("Error adding response:", error);
      throw error;
    }

    return {
      id: data.id,
      content: data.content,
      createdAt: new Date(data.created_at),
      parentId: data.whisper_id
    };
  } catch (error) {
    console.error("Error in addResponse:", error);
    throw error;
  }
};
