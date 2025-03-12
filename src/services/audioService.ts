
import { supabase } from "@/integrations/supabase/client";

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
