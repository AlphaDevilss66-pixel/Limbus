
import { useState, useEffect } from "react";
import { WhisperCard } from "@/components/WhisperCard";
import { WhisperForm } from "@/components/WhisperForm";
import { WhisperFilter } from "@/components/WhisperFilter";
import { Emotion, Theme, Whisper, VisualMode, WhisperMode } from "@/types";
import { cn } from "@/lib/utils";

// Sample data for demonstration
const sampleWhispers: Whisper[] = [
  {
    id: 1,
    content: "A volte mi sento come una foglia che galleggia sull'acqua.",
    emotion: "Nostalgia",
    theme: "Vita",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    resonanceCount: 42,
    resonances: [
      { type: "comprendo", count: 15 },
      { type: "pensare", count: 27 },
    ],
    mode: "standard",
    isWhisperOfDay: true,
    responses: [
      {
        id: 101,
        content: "Sospeso tra due mondi, senza appartenere a nessuno dei due.",
        createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
        parentId: 1,
      },
      {
        id: 102,
        content: "Eppure quella foglia trova il suo equilibrio, la sua pace.",
        createdAt: new Date(Date.now() - 1000 * 60 * 15), // 15 mins ago
        parentId: 1,
      },
    ],
  },
  {
    id: 2,
    content: "Nel silenzio della notte, i sogni parlano più forte delle parole.",
    emotion: "Speranza",
    theme: "Sogni",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    resonanceCount: 23,
    resonances: [
      { type: "comprendo", count: 8 },
      { type: "anchio", count: 15 },
    ],
    mode: "vento",
    responses: [],
  },
  {
    id: 3,
    content: "Ogni tramonto è una promessa di un nuovo inizio.",
    emotion: "Felicità",
    theme: "Vita",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 hours ago
    resonanceCount: 15,
    resonances: [
      { type: "sentire", count: 10 },
      { type: "condivido", count: 5 },
    ],
    mode: "fuoco",
    responses: [
      {
        id: 103,
        content: "E ogni alba è la realizzazione di quella promessa.",
        createdAt: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
        parentId: 3,
      },
    ],
  },
  {
    id: 4,
    content: "Ho smesso di aspettarmi qualcosa dagli altri, così ho iniziato a trovare tutto in me stesso.",
    emotion: "Rabbia",
    theme: "Solitudine",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
    resonanceCount: 31,
    resonances: [
      { type: "comprendo", count: 20 },
      { type: "anchio", count: 11 },
    ],
    mode: "fuoco",
    responses: [],
  },
  {
    id: 5,
    content: "Ci sono giorni in cui il passato sembra più reale del presente.",
    emotion: "Nostalgia",
    theme: "Ricordi",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    resonanceCount: 18,
    resonances: [
      { type: "pensare", count: 9 },
      { type: "sentire", count: 9 },
    ],
    mode: "vento",
    responses: [],
  },
  {
    id: 6,
    audioUrl: "https://cdn.freesound.org/previews/459/459658_4778055-lq.mp3",
    content: "",
    emotion: "Paura",
    theme: "Morte",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 36), // 1.5 days ago
    resonanceCount: 7,
    resonances: [
      { type: "comprendo", count: 7 },
    ],
    mode: "standard",
    responses: [],
  },
];

const Index = () => {
  const [filteredWhispers, setFilteredWhispers] = useState<Whisper[]>(sampleWhispers);
  const [filters, setFilters] = useState<{
    emotion?: Emotion;
    theme?: Theme;
    mode?: WhisperMode;
    visualMode: VisualMode;
  }>({
    visualMode: "standard",
  });

  useEffect(() => {
    let result = [...sampleWhispers];
    
    if (filters.emotion) {
      result = result.filter((whisper) => whisper.emotion === filters.emotion);
    }
    
    if (filters.theme) {
      result = result.filter((whisper) => whisper.theme === filters.theme);
    }
    
    if (filters.mode) {
      result = result.filter((whisper) => whisper.mode === filters.mode);
    }
    
    setFilteredWhispers(result);
  }, [filters]);

  const getContainerClass = () => {
    switch (filters.visualMode) {
      case "foglie":
        return "bg-gradient-to-b from-green-50 to-green-100";
      case "gocce":
        return "bg-gradient-to-b from-blue-50 to-blue-100";
      case "nebbia":
        return "bg-gradient-to-b from-gray-50 to-gray-100";
      default:
        return "bg-gradient-to-b from-limbus-50 to-white";
    }
  };

  const getCardClass = (whisper: Whisper) => {
    switch (filters.visualMode) {
      case "foglie":
        return "animate-float";
      case "gocce":
        return "bg-white/40 border-white/30 backdrop-blur-sm";
      case "nebbia":
        return "backdrop-blur-md bg-white/20";
      default:
        return "";
    }
  };

  return (
    <div className={cn("min-h-screen px-4 py-8 transition-colors duration-500", getContainerClass())}>
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-center text-4xl font-bold text-limbus-900">
          Limbus
        </h1>
        <p className="text-center text-gray-600 mb-8 max-w-md mx-auto">
          Condividi i tuoi pensieri anonimi e scopri quelli degli altri. Un luogo dove le parole si librano nell'aria.
        </p>
        
        <WhisperForm />
        
        <div className="mt-8">
          <WhisperFilter onFilterChange={setFilters} />
          
          <div className={cn(
            "space-y-6",
            filters.visualMode === "foglie" && "relative",
          )}>
            {filteredWhispers.map((whisper) => (
              <WhisperCard
                key={whisper.id}
                whisper={whisper}
                className={getCardClass(whisper)}
              />
            ))}
            
            {filteredWhispers.length === 0 && (
              <div className="text-center py-10 text-gray-500">
                Nessun sussurro trovato con i filtri selezionati.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
