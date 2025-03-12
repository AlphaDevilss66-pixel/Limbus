
import { useState, useEffect } from "react";
import { Emotion, Theme, Whisper, WhisperMode } from "@/types";
import { fetchWhispers } from "@/services/whisperService";

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
        const data = await fetchWhispers();
        
        // Apply filters
        let filteredData = [...data];
        
        if (filters.emotion) {
          filteredData = filteredData.filter((whisper) => whisper.emotion === filters.emotion);
        }
        
        if (filters.theme) {
          filteredData = filteredData.filter((whisper) => whisper.theme === filters.theme);
        }
        
        if (filters.mode) {
          filteredData = filteredData.filter((whisper) => whisper.mode === filters.mode);
        }
        
        setWhispers(filteredData);
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
