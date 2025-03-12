
import { useState } from "react";
import { X, Filter } from "lucide-react";
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

const visualModes: { value: VisualMode; label: string }[] = [
  { value: "standard", label: "Standard" },
  { value: "foglie", label: "Foglie nel vento" },
  { value: "gocce", label: "Gocce su specchio" },
  { value: "nebbia", label: "Nebbia" },
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

  const handleFilterChange = () => {
    onFilterChange({
      emotion: emotion || undefined,
      theme: theme || undefined,
      mode: (mode as WhisperMode) || undefined,
      visualMode,
    });
    setIsOpen(false);
  };

  const clearFilters = () => {
    setEmotion("");
    setTheme("");
    setMode("");
    onFilterChange({ visualMode });
  };

  const hasActiveFilters = emotion || theme || mode;

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-2 items-center">
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className={cn(
                  "flex items-center gap-1", 
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
            <PopoverContent className="w-80">
              <div className="space-y-4 p-1">
                <h3 className="font-medium text-sm">Filtra i sussurri</h3>
                
                <div className="space-y-2">
                  <label className="text-xs font-medium">Emozione</label>
                  <Select value={emotion} onValueChange={(val) => setEmotion(val as Emotion)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Qualsiasi emozione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Qualsiasi emozione</SelectItem>
                      {emotions.map((item) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-medium">Tema</label>
                  <Select value={theme} onValueChange={(val) => setTheme(val as Theme)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Qualsiasi tema" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Qualsiasi tema</SelectItem>
                      {themes.map((item) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-medium">Modalità</label>
                  <Select value={mode} onValueChange={(val) => setMode(val as WhisperMode)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Qualsiasi modalità" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Qualsiasi modalità</SelectItem>
                      <SelectItem value="vento">Vento</SelectItem>
                      <SelectItem value="fuoco">Fuoco</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="pt-2 flex items-center justify-between">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={clearFilters}
                    className="text-xs"
                  >
                    <X size={12} className="mr-1" />
                    Cancella filtri
                  </Button>
                  <Button 
                    size="sm" 
                    className="bg-limbus-600 hover:bg-limbus-700"
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
        
        <Select value={visualMode} onValueChange={(val) => {
          setVisualMode(val as VisualMode);
          onFilterChange({
            emotion: emotion || undefined,
            theme: theme || undefined,
            mode: (mode as WhisperMode) || undefined,
            visualMode: val as VisualMode,
          });
        }}>
          <SelectTrigger className="w-auto text-xs bg-gray-100 border-gray-200">
            <SelectValue placeholder="Visualizzazione" />
          </SelectTrigger>
          <SelectContent>
            {visualModes.map((mode) => (
              <SelectItem key={mode.value} value={mode.value}>
                {mode.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
