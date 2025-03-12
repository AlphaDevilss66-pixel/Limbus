
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
  const [filtersChanged, setFiltersChanged] = useState(false);

  const loadWhispers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Aggiunge un piccolo ritardo per garantire che lo stato di loading sia visibile
      await new Promise((resolve) => setTimeout(resolve, 300));
      
      const data = await getWhispers(filters);
      setWhispers(data);
      
      // Notifica solo per refresh manuale o cambio filtri, non al caricamento iniziale
      if (!isInitialLoad) {
        if (filtersChanged) {
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
          
          // Resetta la flag dei filtri
          setFiltersChanged(false);
        } else {
          // Notifica solo per refresh manuale esplicito
          toast.success("Sussurri aggiornati", {
            description: "Gli ultimi sussurri sono stati caricati",
            position: "bottom-center",
          });
        }
      }
      
      // Imposta isInitialLoad a false dopo il primo caricamento
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
  }, [filters.emotion, filters.theme, filters.mode, isInitialLoad, filtersChanged]);

  // Effetto per caricare i sussurri quando cambiano i filtri
  useEffect(() => {
    // Segna che i filtri sono cambiati solo se non è il caricamento iniziale
    if (!isInitialLoad) {
      setFiltersChanged(true);
    }
    loadWhispers();
  }, [filters.emotion, filters.theme, filters.mode, loadWhispers]);

  // Funzione per aggiornare manualmente i sussurri
  const refresh = useCallback(() => {
    // Annulla la flag dei filtri per far sì che venga mostrata la notifica "Sussurri aggiornati"
    setFiltersChanged(false); 
    loadWhispers();
  }, [loadWhispers]);

  return { whispers, loading, error, setWhispers, refresh };
};
