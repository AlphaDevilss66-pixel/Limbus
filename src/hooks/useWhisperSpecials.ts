
import { useState } from "react";
import { 
  createDestinyWhisper, 
  createTimeCapsuleWhisper, 
  createSecretWhisper 
} from "@/services/whisperService";
import { Emotion, Theme, WhisperMode, WhisperSpecialType } from "@/types";
import { toast } from "sonner";

export const useWhisperSpecials = () => {
  const [activeSpecialType, setActiveSpecialType] = useState<WhisperSpecialType | "">("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const submitSecretWhisper = async (whisperData: {
    content: string;
    emotion?: Emotion;
    theme?: Theme;
    audioUrl?: string;
    mode?: WhisperMode;
  }) => {
    try {
      setIsSubmitting(true);
      await createSecretWhisper(whisperData);
      toast.success("Il tuo segreto è stato aggiunto alla Biblioteca Invisibile");
      return true;
    } catch (error) {
      console.error("Error creating secret whisper:", error);
      toast.error("Impossibile salvare il segreto");
      return false;
    } finally {
      setIsSubmitting(false);
      setActiveSpecialType("");
    }
  };
  
  const submitDestinyWhisper = async (whisperData: {
    content: string;
    emotion?: Emotion;
    theme?: Theme;
    audioUrl?: string;
    mode?: WhisperMode;
  }) => {
    try {
      setIsSubmitting(true);
      await createDestinyWhisper(whisperData);
      toast.success("Il tuo sussurro è stato affidato al destino");
      return true;
    } catch (error) {
      console.error("Error creating destiny whisper:", error);
      toast.error("Impossibile affidare il sussurro al destino");
      return false;
    } finally {
      setIsSubmitting(false);
      setActiveSpecialType("");
    }
  };
  
  const submitTimeCapsuleWhisper = async (whisperData: {
    content: string;
    emotion?: Emotion;
    theme?: Theme;
    audioUrl?: string;
    mode?: WhisperMode;
    releaseYears: number;
  }) => {
    try {
      setIsSubmitting(true);
      await createTimeCapsuleWhisper(whisperData);
      toast.success(`Il tuo sussurro verrà rivelato tra ${whisperData.releaseYears} ${whisperData.releaseYears === 1 ? 'anno' : 'anni'}`);
      return true;
    } catch (error) {
      console.error("Error creating time capsule whisper:", error);
      toast.error("Impossibile creare la capsula temporale");
      return false;
    } finally {
      setIsSubmitting(false);
      setActiveSpecialType("");
    }
  };
  
  return {
    activeSpecialType,
    setActiveSpecialType,
    isSubmitting,
    submitSecretWhisper,
    submitDestinyWhisper,
    submitTimeCapsuleWhisper
  };
};
