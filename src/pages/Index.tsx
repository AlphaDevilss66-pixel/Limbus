
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { WhisperCard } from "@/components/WhisperCard";
import { WhisperForm } from "@/components/WhisperForm";
import { WhisperFilter } from "@/components/WhisperFilter";
import { Emotion, Theme, VisualMode, WhisperMode } from "@/types";
import { cn } from "@/lib/utils";
import { useWhispers } from "@/hooks/useWhispers";
import { Loader2, LogOut, Home } from "lucide-react";
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

  const { whispers, loading, error, setWhispers } = useWhispers({
    emotion: filters.emotion,
    theme: filters.theme,
    mode: filters.mode,
  });

  const handleRefresh = () => {
    // Force a refetch by triggering a state update
    setWhispers([]);
  };

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

  const getCardClass = () => {
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
    <div className={cn("min-h-screen transition-colors duration-500", getContainerClass())}>
      {/* Header/Navbar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 text-limbus-900">
            <Home className="h-5 w-5" />
            <span className="font-medium">Home</span>
          </Link>
          
          <div className="text-center text-limbus-900 font-bold text-xl">Limbus</div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={signOut}
            className="flex items-center gap-1 text-gray-600"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Esci</span>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="mb-8 text-center text-3xl font-bold text-limbus-900">
            I tuoi sussurri
          </h1>
          <p className="text-center text-gray-600 mb-8 max-w-md mx-auto">
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
                "space-y-6",
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
                  <div className="text-center py-10 text-gray-500">
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
