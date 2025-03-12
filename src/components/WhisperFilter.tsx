
import { useState } from "react";
import { X, Filter, BookLock, History, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Emotion, Theme, VisualMode, WhisperMode } from "@/types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

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

interface WhisperFilterProps {
  onFilterChange: (filters: {
    emotion?: Emotion;
    theme?: Theme;
    mode?: WhisperMode;
    visualMode: VisualMode;
  }) => void;
}

export const WhisperFilter = ({ onFilterChange }: WhisperFilterProps) => {
  const [emotion, setEmotion] = useState<Emotion>("");
  const [theme, setTheme] = useState<Theme>("");
  const [mode, setMode] = useState<WhisperMode | "">("");
  const [visualMode, setVisualMode] = useState<VisualMode>("standard");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleFilterChange = () => {
    onFilterChange({
      emotion: emotion || undefined,
      theme: theme || undefined,
      mode: (mode as WhisperMode) || undefined,
      visualMode,
    });
    setIsOpen(false);
    
    // Navigate to the filtered page when filter is applied
    if (emotion) {
      navigate(`/filtered/${emotion}`);
    } else if (theme) {
      navigate(`/filtered/${theme}`);
    } else {
      navigate("/filtered/all");
    }
  };

  const clearFilters = () => {
    setEmotion("");
    setTheme("");
    setMode("");
    onFilterChange({ visualMode });
    setIsOpen(false);
  };

  const hasActiveFilters = emotion || theme || mode;

  // Function to cycle through visual modes
  const cycleVisualMode = () => {
    const nextMode: VisualMode = 
      visualMode === "standard" ? "foglie" : 
      visualMode === "foglie" ? "gocce" : 
      visualMode === "gocce" ? "nebbia" : "standard";
    
    setVisualMode(nextMode);
    onFilterChange({
      emotion: emotion || undefined,
      theme: theme || undefined,
      mode: (mode as WhisperMode) || undefined,
      visualMode: nextMode,
    });
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex flex-wrap gap-3 items-center">
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className={cn(
                  "flex items-center gap-1 bg-white/70 hover:bg-white/90 transition-all", 
                  hasActiveFilters && "bg-limbus-100 border-limbus-300"
                )}
              >
                <Filter size={14} />
                <span>Filtri</span>
                {hasActiveFilters && (
                  <Badge className="ml-1 bg-limbus-500">{[emotion, theme, mode].filter(Boolean).length}</Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 bg-gradient-to-br from-purple-50 to-indigo-50 backdrop-blur-lg border-purple-200/50 p-6 rounded-xl shadow-[0_0_25px_rgba(139,92,246,0.3)] animate-in zoom-in-95 duration-200">
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-lg text-purple-800">Filtro Sussurri</h3>
                  <div className="h-1 w-10 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full"></div>
                </div>
                
                <div className="space-y-3">
                  <label className="text-sm font-medium text-purple-700 flex items-center gap-2">
                    <span className="size-2 bg-pink-400 rounded-full"></span>
                    Emozione
                  </label>
                  <Select value={emotion} onValueChange={(val) => setEmotion(val as Emotion)}>
                    <SelectTrigger className="w-full bg-white/80 border-purple-200 hover:border-purple-300 transition-colors rounded-lg shadow-sm">
                      <SelectValue placeholder="Qualsiasi emozione" />
                    </SelectTrigger>
                    <SelectContent className="bg-white/95 border-purple-200 backdrop-blur-md">
                      <SelectItem value="all" className="focus:bg-pink-50">Qualsiasi emozione</SelectItem>
                      {emotions.map((item) => (
                        <SelectItem key={item} value={item} className="focus:bg-pink-50">
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-3">
                  <label className="text-sm font-medium text-purple-700 flex items-center gap-2">
                    <span className="size-2 bg-blue-400 rounded-full"></span>
                    Tema
                  </label>
                  <Select value={theme} onValueChange={(val) => setTheme(val as Theme)}>
                    <SelectTrigger className="w-full bg-white/80 border-purple-200 hover:border-purple-300 transition-colors rounded-lg shadow-sm">
                      <SelectValue placeholder="Qualsiasi tema" />
                    </SelectTrigger>
                    <SelectContent className="bg-white/95 border-purple-200 backdrop-blur-md">
                      <SelectItem value="all" className="focus:bg-blue-50">Qualsiasi tema</SelectItem>
                      {themes.map((item) => (
                        <SelectItem key={item} value={item} className="focus:bg-blue-50">
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-3">
                  <label className="text-sm font-medium text-purple-700 flex items-center gap-2">
                    <span className="size-2 bg-amber-400 rounded-full"></span>
                    Modalità
                  </label>
                  <Select value={mode} onValueChange={(val) => setMode(val as WhisperMode)}>
                    <SelectTrigger className="w-full bg-white/80 border-purple-200 hover:border-purple-300 transition-colors rounded-lg shadow-sm">
                      <SelectValue placeholder="Qualsiasi modalità" />
                    </SelectTrigger>
                    <SelectContent className="bg-white/95 border-purple-200 backdrop-blur-md">
                      <SelectItem value="all" className="focus:bg-amber-50">Qualsiasi modalità</SelectItem>
                      <SelectItem value="vento" className="focus:bg-amber-50">Vento</SelectItem>
                      <SelectItem value="fuoco" className="focus:bg-amber-50">Fuoco</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="h-px w-full bg-gradient-to-r from-transparent via-purple-200 to-transparent my-2"></div>
                
                <div className="pt-2 flex items-center justify-between">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={clearFilters}
                    className="text-xs text-purple-600 hover:text-purple-800 hover:bg-purple-100/50"
                  >
                    <X size={12} className="mr-1" />
                    Cancella filtri
                  </Button>
                  <Button 
                    size="sm" 
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-[0_4px_12px_rgba(139,92,246,0.3)] hover:shadow-[0_6px_16px_rgba(139,92,246,0.4)] transition-all"
                    onClick={handleFilterChange}
                  >
                    Applica
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-1">
              {emotion && (
                <Badge 
                  className="bg-pink-100 hover:bg-pink-200 text-pink-700 border-pink-300"
                  variant="outline"
                >
                  {emotion}
                  <button className="ml-1" onClick={() => { setEmotion(""); handleFilterChange(); }}>
                    <X size={10} />
                  </button>
                </Badge>
              )}
              {theme && (
                <Badge 
                  className="bg-blue-100 hover:bg-blue-200 text-blue-700 border-blue-300"
                  variant="outline"
                >
                  {theme}
                  <button className="ml-1" onClick={() => { setTheme(""); handleFilterChange(); }}>
                    <X size={10} />
                  </button>
                </Badge>
              )}
              {mode && (
                <Badge 
                  className="bg-orange-100 hover:bg-orange-200 text-orange-700 border-orange-300"
                  variant="outline"
                >
                  {mode === "vento" ? "Vento" : "Fuoco"}
                  <button className="ml-1" onClick={() => { setMode(""); handleFilterChange(); }}>
                    <X size={10} />
                  </button>
                </Badge>
              )}
            </div>
          )}
        </div>
        
        <div className="flex gap-2 items-center">
          <Button 
            size="sm" 
            variant="outline" 
            className="text-xs bg-purple-100 border-purple-300 text-purple-700 hover:bg-purple-200"
            onClick={cycleVisualMode}
          >
            <Sparkles size={14} className="mr-1 text-purple-500" />
            <span>{visualMode === "standard" ? "Standard" : 
                  visualMode === "foglie" ? "Foglie" : 
                  visualMode === "gocce" ? "Gocce" : "Nebbia"}</span>
          </Button>
          
          <Button 
            size="sm" 
            variant="outline" 
            className="text-xs bg-indigo-100 border-indigo-300 text-indigo-700 hover:bg-indigo-200 shadow-glow-blue"
            onClick={() => navigate("/biblioteca")}
          >
            <BookLock size={14} className="mr-1 text-indigo-500" />
            <span>Biblioteca</span>
          </Button>
          
          <Button 
            size="sm" 
            variant="outline" 
            className="text-xs bg-amber-100 border-amber-300 text-amber-700 hover:bg-amber-200 shadow-glow-green"
            onClick={() => navigate("/passato")}
          >
            <History size={14} className="mr-1 text-amber-500" />
            <span>Passato</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
