
import { Heart, MessageCircle, Wind } from "lucide-react";
import { cn } from "@/lib/utils";

interface WhisperCardProps {
  content: string;
  emotion?: string;
  theme?: string;
  resonanceCount?: number;
  className?: string;
  isWhisperOfDay?: boolean;
}

export const WhisperCard = ({
  content,
  emotion,
  theme,
  resonanceCount = 0,
  className,
  isWhisperOfDay = false,
}: WhisperCardProps) => {
  return (
    <div
      className={cn(
        "whisper-card relative",
        isWhisperOfDay && "animate-float border-limbus-300",
        className
      )}
    >
      {isWhisperOfDay && (
        <span className="absolute -top-2 -right-2 whisper-tag bg-limbus-100 text-limbus-700">
          Whisper del Giorno
        </span>
      )}
      <p className="mb-4 text-lg leading-relaxed text-gray-800">{content}</p>
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {emotion && (
            <span className="whisper-tag bg-pink-100 text-pink-700">
              {emotion}
            </span>
          )}
          {theme && (
            <span className="whisper-tag bg-blue-100 text-blue-700">{theme}</span>
          )}
        </div>
        <div className="flex items-center gap-4 text-gray-500">
          <button className="flex items-center gap-1 transition-colors hover:text-limbus-600">
            <Heart size={18} />
            <span className="text-sm">{resonanceCount}</span>
          </button>
          <button className="transition-colors hover:text-limbus-600">
            <MessageCircle size={18} />
          </button>
          <button className="transition-colors hover:text-limbus-600">
            <Wind size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
