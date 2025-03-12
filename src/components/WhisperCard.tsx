
import { useState } from "react";
import { Heart, MessageCircle, Wind, Flame } from "lucide-react";
import { cn } from "@/lib/utils";
import { Whisper, ResonanceType } from "@/types";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { addResonance } from "@/services/whisperService";

interface WhisperCardProps {
  whisper: Whisper;
  className?: string;
  onUpdate?: () => void;
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
}: WhisperCardProps) => {
  const [showResponses, setShowResponses] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getVisualClass = () => {
    if (whisper.mode === "vento") return "animate-float border-blue-300";
    if (whisper.mode === "fuoco") return "animate-pulse-slow border-orange-300";
    if (whisper.isWhisperOfDay) return "animate-float border-limbus-300";
    return "";
  };

  const getModeIcon = () => {
    if (whisper.mode === "vento") return <Wind size={16} className="text-blue-500" />;
    if (whisper.mode === "fuoco") return <Flame size={16} className="text-orange-500" />;
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

  return (
    <div
      className={cn(
        "whisper-card relative",
        getVisualClass(),
        className
      )}
    >
      {whisper.isWhisperOfDay && (
        <span className="absolute -top-2 -right-2 whisper-tag bg-limbus-100 text-limbus-700">
          Whisper del Giorno
        </span>
      )}
      
      <div className="flex items-start gap-2 mb-3">
        {getModeIcon()}
        <p className="text-lg leading-relaxed text-gray-800 flex-1">{whisper.content}</p>
        {whisper.audioUrl && (
          <audio
            src={whisper.audioUrl}
            controls
            className="mt-2 w-full max-w-[200px]"
          />
        )}
      </div>
      
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex flex-wrap gap-2">
          {whisper.emotion && (
            <span className="whisper-tag bg-pink-100 text-pink-700">
              {whisper.emotion}
            </span>
          )}
          {whisper.theme && (
            <span className="whisper-tag bg-blue-100 text-blue-700">
              {whisper.theme}
            </span>
          )}
          <span className="whisper-tag bg-gray-100 text-gray-700 text-xs">
            {new Date(whisper.createdAt).toLocaleDateString("it-IT", {
              day: "numeric",
              month: "short",
            })}
          </span>
        </div>
        
        <div className="flex items-center gap-3 text-gray-500">
          <Popover>
            <PopoverTrigger asChild>
              <button 
                className="flex items-center gap-1 transition-colors hover:text-limbus-600"
                disabled={isSubmitting}
              >
                <Heart size={18} />
                <span className="text-sm">{whisper.resonanceCount}</span>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-2">
              <div className="flex flex-col gap-1">
                {resonanceTypes.map((resonance) => (
                  <button
                    key={resonance.type}
                    onClick={() => handleResonance(resonance.type)}
                    className={cn("px-3 py-1 rounded-full text-xs font-medium", resonance.color)}
                    disabled={isSubmitting}
                  >
                    {resonance.label}
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
          
          <button 
            className="transition-colors hover:text-limbus-600"
            onClick={() => setShowResponses(!showResponses)}
            disabled={isSubmitting}
          >
            <MessageCircle size={18} />
          </button>
        </div>
      </div>
      
      {showResponses && whisper.responses && whisper.responses.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <h4 className="text-xs font-medium text-gray-500 mb-2">Pensiero collettivo</h4>
          <div className="space-y-2">
            {whisper.responses.map((response) => (
              <div key={response.id} className="text-sm p-2 bg-gray-50 rounded-md">
                {response.content}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
