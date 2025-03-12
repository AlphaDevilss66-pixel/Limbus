
import { useState, useEffect, useCallback } from "react";
import { Emotion, Theme, Whisper, WhisperMode } from "@/types";
import { getWhispers } from "@/services/whisperService";
import { toast } from "sonner";

export const useWhispers = (filters: {
  emotion?: Emotion;
  theme?: Theme;
  mode?: WhisperMode;
}) => {
  const [whispers, setWhispers] = useState<Whisper[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadWhispers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getWhispers(filters);
      setWhispers(data);
      
      // Notify only on refresh, not initial load
      if (!loading) {
        toast.success("Sussurri aggiornati", {
          description: "Gli ultimi sussurri sono stati caricati",
          position: "bottom-center",
        });
      }
    } catch (err) {
      setError(err as Error);
      console.error("Failed to fetch whispers:", err);
      toast.error("Impossibile caricare i sussurri", {
        description: "Riprova più tardi",
      });
    } finally {
      setLoading(false);
    }
  }, [filters.emotion, filters.theme, filters.mode]);

  useEffect(() => {
    loadWhispers();
  }, [loadWhispers]);

  const refresh = useCallback(() => {
    loadWhispers();
  }, [loadWhispers]);

  return { whispers, loading, error, setWhispers, refresh };
};
