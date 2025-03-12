
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mic, Send, Wind, Flame } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Emotion, Theme, WhisperMode } from "@/types";
import { createWhisper, uploadAudio } from "@/services/whisperService";

const emotions: Emotion[] = [
  "Felicità",
  "Tristezza",
  "Rabbia",
  "Nostalgia",
  "Speranza",
  "Paura",
];

const themes: Theme[] = [
  "Amore",
  "Solitudine",
  "Ricordi",
  "Vita",
  "Morte",
  "Sogni",
  "Desideri",
  "Fallimenti",
];

interface WhisperFormProps {
  onWhisperCreated: () => void;
}

export const WhisperForm = ({ onWhisperCreated }: WhisperFormProps) => {
  const [content, setContent] = useState("");
  const [emotion, setEmotion] = useState<Emotion>("");
  const [theme, setTheme] = useState<Theme>("");
  const [mode, setMode] = useState<WhisperMode>("standard");
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioUrl(audioUrl);
        toast.success("Audio registrato con successo!");
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      toast.error("Impossibile accedere al microfono");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      // Stop all audio tracks
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  const toggleMode = (newMode: WhisperMode) => {
    setMode(prevMode => prevMode === newMode ? "standard" : newMode);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content && !audioUrl) {
      toast.error("Inserisci un pensiero o registra un audio");
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Upload audio if exists
      let uploadedAudioUrl = null;
      if (audioUrl) {
        const response = await fetch(audioUrl);
        const blob = await response.blob();
        uploadedAudioUrl = await uploadAudio(blob);
      }
      
      // Create whisper
      await createWhisper({
        content,
        emotion: emotion || undefined,
        theme: theme || undefined,
        audioUrl: uploadedAudioUrl || undefined,
        mode,
      });
      
      // Show success message
      toast.success("Il tuo sussurro è stato condiviso");
      
      // Clear form
      setContent("");
      setEmotion("");
      setTheme("");
      setMode("standard");
      setAudioUrl(null);
      
      // Notify parent component
      onWhisperCreated();
    } catch (error) {
      console.error("Error submitting whisper:", error);
      toast.error("Si è verificato un errore nel condividere il tuo sussurro");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="whisper-card space-y-4">
      <div className="text-xs font-semibold uppercase text-limbus-600 mb-2">
        Condividi il tuo sussurro
      </div>
      
      <Textarea
        placeholder="Condividi il tuo pensiero..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="min-h-[120px] resize-none bg-transparent text-lg"
        disabled={isSubmitting}
      />
      
      {audioUrl && (
        <div className="mt-2">
          <audio src={audioUrl} controls className="w-full" />
          <button 
            type="button" 
            onClick={() => setAudioUrl(null)} 
            className="text-xs text-limbus-600 mt-1"
            disabled={isSubmitting}
          >
            Rimuovi audio
          </button>
        </div>
      )}

      <div className="flex flex-wrap gap-4">
        <Select
          value={emotion}
          onValueChange={(val) => setEmotion(val as Emotion)}
          disabled={isSubmitting}
        >
          <SelectTrigger className="w-full sm:w-auto flex-1">
            <SelectValue placeholder="Emozione" />
          </SelectTrigger>
          <SelectContent>
            {emotions.map((emotion) => (
              <SelectItem key={emotion} value={emotion}>
                {emotion}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select
          value={theme}
          onValueChange={(val) => setTheme(val as Theme)}
          disabled={isSubmitting}
        >
          <SelectTrigger className="w-full sm:w-auto flex-1">
            <SelectValue placeholder="Tema" />
          </SelectTrigger>
          <SelectContent>
            {themes.map((theme) => (
              <SelectItem key={theme} value={theme}>
                {theme}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className={cn(
              "flex items-center text-xs",
              mode === "vento" && "bg-blue-100 text-blue-700 border-blue-300"
            )}
            onClick={() => toggleMode("vento")}
            disabled={isSubmitting}
          >
            <Wind size={14} className="mr-1" />
            Vento
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className={cn(
              "flex items-center text-xs",
              mode === "fuoco" && "bg-orange-100 text-orange-700 border-orange-300"
            )}
            onClick={() => toggleMode("fuoco")}
            disabled={isSubmitting}
          >
            <Flame size={14} className="mr-1" />
            Fuoco
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className={cn(
              "flex items-center text-xs",
              isRecording && "bg-red-100 text-red-700 border-red-300"
            )}
            onClick={isRecording ? stopRecording : startRecording}
            disabled={isSubmitting}
          >
            <Mic size={14} className={cn("mr-1", isRecording && "animate-pulse")} />
            {isRecording ? "Ferma" : "Audio"}
          </Button>
        </div>
        
        <Button
          type="submit"
          className="bg-limbus-600 hover:bg-limbus-700"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <span className="animate-spin mr-2">⏳</span> 
              Inviando...
            </span>
          ) : (
            <>
              <Send size={16} className="mr-2" /> Sussurra
            </>
          )}
        </Button>
      </div>
    </form>
  );
};
