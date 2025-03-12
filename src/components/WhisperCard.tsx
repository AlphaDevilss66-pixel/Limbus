
import { useState } from "react";
import { Heart, MessageCircle, Wind, Flame, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { Whisper, ResonanceType, Emotion, Theme } from "@/types";
import { toast } from "sonner";
import { motion } from "framer-motion";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { addResonance } from "@/services/whisperService";
import { addResponse } from "@/services/responseService";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface WhisperCardProps {
  whisper: Whisper;
  className?: string;
  onUpdate?: () => void;
  onEmotionClick?: (emotion: Emotion) => void;
  onThemeClick?: (theme: Theme) => void;
}

const resonanceTypes: {type: ResonanceType, label: string, color: string}[] = [
  {type: "comprendo", label: "Ti comprendo", color: "bg-blue-100 text-blue-700"},
  {type: "anchio", label: "Anch'io", color: "bg-green-100 text-green-700"},
  {type: "pensare", label: "Mi fa pensare", color: "bg-purple-100 text-purple-700"}, 
  {type: "sentire", label: "Lo sento", color: "bg-pink-100 text-pink-700"},
  {type: "condivido", label: "Condivido", color: "bg-yellow-100 text-yellow-700"}
];

export const WhisperCard = ({
  whisper,
  className,
  onUpdate,
  onEmotionClick,
  onThemeClick,
}: WhisperCardProps) => {
  const [showResponses, setShowResponses] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newResponse, setNewResponse] = useState("");
  const [showResponseForm, setShowResponseForm] = useState(false);
  const navigate = useNavigate();

  const getVisualClass = () => {
    if (whisper.mode === "vento") return "animate-float bg-gradient-to-br from-blue-50/60 via-blue-100/60 to-white/60";
    if (whisper.mode === "fuoco") return "animate-pulse-slow bg-gradient-to-br from-amber-50/60 via-red-50/60 to-white/60";
    if (whisper.isWhisperOfDay) return "animate-float bg-gradient-to-br from-amber-50/60 via-yellow-50/60 to-white/60";
    return "bg-gradient-to-br from-purple-50/60 via-limbus-50/60 to-white/60";
  };

  const getModeIcon = () => {
    if (whisper.mode === "vento") return (
      <motion.div 
        animate={{ rotate: [-5, 5, -5] }} 
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <Wind size={16} className="text-blue-500" />
      </motion.div>
    );
    if (whisper.mode === "fuoco") return (
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }} 
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <Flame size={16} className="text-orange-500" />
      </motion.div>
    );
    return null;
  };

  const handleResonance = async (type: ResonanceType) => {
    try {
      setIsSubmitting(true);
      await addResonance(whisper.id, type);
      toast.success(`Hai risuonato: ${resonanceTypes.find(r => r.type === type)?.label}`);
      if (onUpdate) onUpdate();
    } catch (error) {
      console.error("Error adding resonance:", error);
      toast.error("Si è verificato un errore nell'aggiungere la risonanza");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddResponse = async () => {
    if (!newResponse.trim()) {
      toast.error("Il pensiero non può essere vuoto");
      return;
    }

    try {
      setIsSubmitting(true);
      await addResponse(whisper.id, newResponse.trim());
      toast.success("Pensiero aggiunto con successo");
      setNewResponse("");
      setShowResponseForm(false);
      if (onUpdate) onUpdate();
    } catch (error) {
      console.error("Error adding response:", error);
      toast.error("Si è verificato un errore nell'aggiungere il pensiero");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmotionClick = (emotion: Emotion) => {
    if (emotion && onEmotionClick) {
      onEmotionClick(emotion);
    } else if (emotion) {
      navigate(`/filtered/${emotion}`);
    }
  };

  const handleThemeClick = (theme: Theme) => {
    if (theme && onThemeClick) {
      onThemeClick(theme);
    } else if (theme) {
      navigate(`/filtered/${theme}`);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(
        "whisper-card relative",
        getVisualClass(),
        className
      )}
    >
      {whisper.isWhisperOfDay && (
        <motion.span 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="absolute -top-2 -right-2 whisper-tag from-amber-300 to-amber-500 text-white animate-pulse-slow shadow-glow"
        >
          Whisper del Giorno
        </motion.span>
      )}
      
      <div className="flex items-start gap-2 mb-3">
        {getModeIcon()}
        <p className="text-lg leading-relaxed text-gray-800 flex-1">{whisper.content}</p>
      </div>
      
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex flex-wrap gap-2">
          {whisper.emotion && (
            <motion.button 
              whileHover={{ scale: 1.05 }}
              className="whisper-tag from-pink-400 to-purple-400 text-white cursor-pointer"
              onClick={() => handleEmotionClick(whisper.emotion)}
              aria-label={`Filtra per emozione: ${whisper.emotion}`}
            >
              {whisper.emotion}
            </motion.button>
          )}
          {whisper.theme && (
            <motion.button 
              whileHover={{ scale: 1.05 }}
              className="whisper-tag from-blue-400 to-cyan-400 text-white cursor-pointer"
              onClick={() => handleThemeClick(whisper.theme)}
              aria-label={`Filtra per tema: ${whisper.theme}`}
            >
              {whisper.theme}
            </motion.button>
          )}
          <motion.span 
            className="whisper-tag from-gray-400 to-gray-500 text-white text-xs"
          >
            {new Date(whisper.createdAt).toLocaleDateString("it-IT", {
              day: "numeric",
              month: "short",
            })}
          </motion.span>
        </div>
        
        <div className="flex items-center gap-3 text-gray-500">
          <Popover>
            <PopoverTrigger asChild>
              <motion.button 
                className="flex items-center gap-1 transition-colors hover:text-limbus-600"
                disabled={isSubmitting}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <motion.div
                  whileHover={{ scale: 1.1, color: "#ec4899" }}
                >
                  <Heart size={18} className="transition-all" />
                </motion.div>
                <span className="text-sm">{whisper.resonanceCount}</span>
              </motion.button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-2 bg-gradient-to-br from-white to-gray-50 backdrop-blur-md border border-limbus-100">
              <div className="flex flex-col gap-1">
                {resonanceTypes.map((resonance) => (
                  <motion.button
                    key={resonance.type}
                    onClick={() => handleResonance(resonance.type)}
                    className={cn("px-3 py-1 rounded-full text-xs font-medium transition-all", resonance.color)}
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.05, x: 3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {resonance.label}
                  </motion.button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
          
          <motion.button 
            className="transition-colors hover:text-limbus-600"
            onClick={(e) => {
              e.stopPropagation();
              setShowResponses(!showResponses);
              setShowResponseForm(false);
            }}
            disabled={isSubmitting}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <MessageCircle size={18} className="hover:text-blue-500 transition-all" />
          </motion.button>
        </div>
      </div>
      
      {showResponses && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-4 pt-4 border-t border-gray-100"
        >
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-xs font-medium text-limbus-500">Pensiero collettivo</h4>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowResponseForm(!showResponseForm)}
              className="text-xs font-medium text-limbus-600 hover:text-limbus-800 transition-colors"
            >
              {showResponseForm ? 'Annulla' : 'Aggiungi pensiero'}
            </motion.button>
          </div>

          {showResponseForm && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4"
            >
              <Textarea
                placeholder="Condividi il tuo pensiero..."
                value={newResponse}
                onChange={(e) => setNewResponse(e.target.value)}
                className="w-full mb-2 resize-none bg-white/50 backdrop-blur-sm border-limbus-200 focus:border-limbus-400"
              />
              <div className="flex justify-end">
                <Button
                  size="sm"
                  onClick={handleAddResponse}
                  disabled={isSubmitting || !newResponse.trim()}
                  className="bg-gradient-to-r from-limbus-500 to-purple-500 hover:from-limbus-600 hover:to-purple-600 text-white"
                >
                  {isSubmitting ? (
                    <span className="animate-pulse">Invio...</span>
                  ) : (
                    <>
                      <Send size={14} />
                      <span>Invia</span>
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          )}

          <div className="space-y-2">
            {whisper.responses && whisper.responses.length > 0 ? (
              whisper.responses.map((response, index) => (
                <motion.div 
                  key={response.id} 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-sm p-2 bg-gradient-to-r from-limbus-50 to-limbus-100 rounded-md shadow-sm text-gray-800"
                >
                  {response.content}
                </motion.div>
              ))
            ) : (
              <p className="text-sm text-gray-500 italic">Nessun pensiero condiviso ancora.</p>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};
