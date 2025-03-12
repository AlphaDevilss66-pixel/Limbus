
import { useState, useEffect } from "react";
import { Emotion, Theme, Whisper, WhisperMode } from "@/types";
import { getWhispers } from "@/services/whisperService";

export const useWhispers = (filters: {
  emotion?: Emotion;
  theme?: Theme;
  mode?: WhisperMode;
}) => {
  const [whispers, setWhispers] = useState<Whisper[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadWhispers = async () => {
      try {
        setLoading(true);
        const data = await getWhispers(filters);
        
        setWhispers(data);
      } catch (err) {
        setError(err as Error);
        console.error("Failed to fetch whispers:", err);
      } finally {
        setLoading(false);
      }
    };

    loadWhispers();
  }, [filters.emotion, filters.theme, filters.mode]);

  return { whispers, loading, error, setWhispers };
};
