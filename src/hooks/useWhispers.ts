
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
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const loadWhispers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getWhispers(filters);
      setWhispers(data);
      
      // Notify only when explicitly refreshing, not on filters change or initial load
      if (!isInitialLoad && !loading) {
        if (filters.emotion || filters.theme) {
          let message = "Filtro applicato";
          if (filters.emotion && filters.theme) {
            message = `Filtro applicato: ${filters.emotion} / ${filters.theme}`;
          } else if (filters.emotion) {
            message = `Filtro applicato: ${filters.emotion}`;
          } else if (filters.theme) {
            message = `Filtro applicato: ${filters.theme}`;
          }
          
          toast.success(message, {
            position: "bottom-center",
          });
        } else {
          toast.success("Sussurri aggiornati", {
            description: "Gli ultimi sussurri sono stati caricati",
            position: "bottom-center",
          });
        }
      }
      
      setIsInitialLoad(false);
    } catch (err) {
      setError(err as Error);
      console.error("Failed to fetch whispers:", err);
      toast.error("Impossibile caricare i sussurri", {
        description: "Riprova più tardi",
      });
    } finally {
      setLoading(false);
    }
  }, [filters.emotion, filters.theme, filters.mode, loading, isInitialLoad]);

  useEffect(() => {
    loadWhispers();
  }, [loadWhispers]);

  const refresh = useCallback(() => {
    setIsInitialLoad(false); // Set to false so toast will show on manual refresh
    loadWhispers();
  }, [loadWhispers]);

  return { whispers, loading, error, setWhispers, refresh };
};
