
-- Funzione per incrementare il conteggio delle risonanze
CREATE OR REPLACE FUNCTION increment_resonance_count(whisper_id BIGINT)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.whispers
  SET resonance_count = resonance_count + 1
  WHERE id = whisper_id;
END;
$$;
