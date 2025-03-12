
import { useState } from "react";
import { Link } from "react-router-dom";
import { WhisperCard } from "@/components/WhisperCard";
import { WhisperForm } from "@/components/WhisperForm";
import { WhisperFilter } from "@/components/WhisperFilter";
import { Emotion, Theme, VisualMode, WhisperMode } from "@/types";
import { cn } from "@/lib/utils";
import { useWhispers } from "@/hooks/useWhispers";
import { Loader2, LogOut, Home, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const Index = () => {
  const { signOut, user } = useAuth();
  const [filters, setFilters] = useState<{
    emotion?: Emotion;
    theme?: Theme;
    mode?: WhisperMode;
    visualMode: VisualMode;
  }>({
    visualMode: "standard",
  });

  const { whispers, loading, error, setWhispers, refresh } = useWhispers({
    emotion: filters.emotion,
    theme: filters.theme,
    mode: filters.mode,
  });

  const handleRefresh = () => {
    refresh();
  };

  const getContainerClass = () => {
    switch (filters.visualMode) {
      case "foglie":
        return "bg-gradient-to-b from-green-50 via-green-100 to-green-50";
      case "gocce":
        return "bg-gradient-to-b from-blue-50 via-blue-100 to-blue-50";
      case "nebbia":
        return "bg-gradient-to-b from-gray-50 via-gray-100 to-gray-50";
      default:
        return "bg-gradient-to-br from-limbus-50 via-purple-50 to-blue-50";
    }
  };

  const getCardClass = () => {
    switch (filters.visualMode) {
      case "foglie":
        return "animate-float shadow-glow";
      case "gocce":
        return "bg-white/40 border-white/30 backdrop-blur-sm shadow-glow";
      case "nebbia":
        return "backdrop-blur-md bg-white/20 shadow-glow";
      default:
        return "shadow-glow";
    }
  };

  return (
    <div className={cn("min-h-screen transition-colors duration-500", getContainerClass())}>
      {/* Header/Navbar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-limbus-200">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 text-limbus-900 hover:text-limbus-600 transition-colors">
            <Home className="h-5 w-5" />
            <span className="font-medium">Home</span>
          </Link>
          
          <div className="text-center font-bold text-2xl bg-gradient-to-r from-limbus-600 to-purple-600 text-transparent bg-clip-text animate-glow-pulse">
            <Sparkles className="h-5 w-5 inline-block mr-2 text-limbus-400" />
            Limbus
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={signOut}
            className="flex items-center gap-1 text-gray-600 hover:text-red-500 hover:bg-red-50 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Esci</span>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="mb-8 text-center text-4xl font-bold bg-gradient-to-r from-limbus-600 to-purple-600 text-transparent bg-clip-text animate-glow-pulse">
            I tuoi sussurri
          </h1>
          <p className="text-center text-gray-600 mb-8 max-w-md mx-auto animate-fade-in">
            Condividi i tuoi pensieri anonimi e scopri quelli degli altri. Un luogo dove le parole si librano nell'aria.
          </p>
          
          <WhisperForm onWhisperCreated={handleRefresh} />
          
          <div className="mt-8">
            <WhisperFilter onFilterChange={setFilters} />
            
            {loading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-limbus-600" />
              </div>
            ) : error ? (
              <div className="text-center py-10 text-red-500">
                Si è verificato un errore nel caricare i sussurri. Riprova più tardi.
              </div>
            ) : (
              <div className={cn(
                "space-y-6 pt-4",
                filters.visualMode === "foglie" && "relative",
              )}>
                {whispers.map((whisper) => (
                  <WhisperCard
                    key={whisper.id}
                    whisper={whisper}
                    className={getCardClass()}
                    onUpdate={handleRefresh}
                  />
                ))}
                
                {whispers.length === 0 && (
                  <div className="text-center py-10 text-gray-500 animate-fade-in bg-white/50 rounded-lg p-8 backdrop-blur-sm">
                    Nessun sussurro trovato con i filtri selezionati.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
