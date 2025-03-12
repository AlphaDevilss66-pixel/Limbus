
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
import { Mic, Send, Wind, Flame, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Emotion, Theme, WhisperMode } from "@/types";
import { createWhisper, uploadAudio } from "@/services/whisperService";
import { motion } from "framer-motion";

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
      
      // Create whisper with the new interface
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
    <motion.form 
      onSubmit={handleSubmit} 
      className="whisper-card space-y-4 bg-white/70 backdrop-blur-lg border border-white/60 shadow-glow-intense rounded-2xl p-6 transition-all duration-300"
      whileHover={{ boxShadow: "0 0 25px rgba(102, 112, 204, 0.3), 0 0 50px rgba(102, 112, 204, 0.15)" }}
    >
      <div className="text-sm font-semibold uppercase text-limbus-600 mb-2 flex items-center">
        <Sparkles className="h-4 w-4 mr-2" />
        Condividi il tuo sussurro
      </div>
      
      <Textarea
        placeholder="Condividi il tuo pensiero..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="min-h-[120px] resize-none bg-white/50 backdrop-blur-sm border-limbus-200/30 focus:border-limbus-400/50 rounded-xl text-lg transition-all duration-300 focus:shadow-glow"
        disabled={isSubmitting}
      />
      
      {audioUrl && (
        <div className="mt-2 p-3 bg-white/50 backdrop-blur-sm rounded-lg border border-limbus-200/30">
          <audio src={audioUrl} controls className="w-full" />
          <button 
            type="button" 
            onClick={() => setAudioUrl(null)} 
            className="text-xs text-limbus-600 mt-2 hover:text-limbus-800 transition-colors"
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
          <SelectTrigger className="w-full sm:w-auto flex-1 bg-white/50 border-limbus-200/30 focus:border-limbus-400/50 rounded-xl">
            <SelectValue placeholder="Emozione" />
          </SelectTrigger>
          <SelectContent className="bg-white/90 backdrop-blur-md border-limbus-200/30">
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
          <SelectTrigger className="w-full sm:w-auto flex-1 bg-white/50 border-limbus-200/30 focus:border-limbus-400/50 rounded-xl">
            <SelectValue placeholder="Tema" />
          </SelectTrigger>
          <SelectContent className="bg-white/90 backdrop-blur-md border-limbus-200/30">
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
              "flex items-center text-xs rounded-xl transition-all duration-300",
              mode === "vento" 
                ? "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 border-blue-300 shadow-glow-blue" 
                : "bg-white/50 border-limbus-200/30 hover:bg-blue-50"
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
              "flex items-center text-xs rounded-xl transition-all duration-300",
              mode === "fuoco" 
                ? "bg-gradient-to-r from-orange-100 to-orange-200 text-orange-700 border-orange-300 shadow-glow-amber" 
                : "bg-white/50 border-limbus-200/30 hover:bg-orange-50"
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
              "flex items-center text-xs rounded-xl transition-all duration-300",
              isRecording 
                ? "bg-gradient-to-r from-red-100 to-red-200 text-red-700 border-red-300 shadow-sm" 
                : "bg-white/50 border-limbus-200/30 hover:bg-red-50"
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
          className="bg-gradient-to-r from-limbus-600 to-purple-600 hover:from-limbus-700 hover:to-purple-700 text-white shadow-glow rounded-xl transition-all duration-300"
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
    </motion.form>
  );
};
