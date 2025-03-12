
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { WhisperCard } from "@/components/WhisperCard";
import { WhisperForm } from "@/components/WhisperForm";
import { WhisperFilter } from "@/components/WhisperFilter";
import { Emotion, Theme, VisualMode, WhisperMode } from "@/types";
import { cn } from "@/lib/utils";
import { useWhispers } from "@/hooks/useWhispers";
import { Loader2, LogOut, Home, Sparkles, Wind, Flame, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  const { signOut, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  
  const emotionParam = queryParams.get('emotion') as Emotion | null;
  const themeParam = queryParams.get('theme') as Theme | null;
  
  const [filters, setFilters] = useState<{
    emotion?: Emotion;
    theme?: Theme;
    mode?: WhisperMode;
    visualMode: VisualMode;
  }>({
    emotion: emotionParam || undefined,
    theme: themeParam || undefined,
    visualMode: "standard",
  });

  // Update filters when URL changes
  useEffect(() => {
    setFilters(prevFilters => ({
      ...prevFilters,
      emotion: emotionParam || undefined,
      theme: themeParam || undefined,
    }));
  }, [emotionParam, themeParam]);

  const { whispers, loading, error, setWhispers, refresh } = useWhispers({
    emotion: filters.emotion,
    theme: filters.theme,
    mode: filters.mode,
  });

  const handleRefresh = () => {
    refresh();
  };

  const handleEmotionClick = (emotion: Emotion) => {
    setFilters(prev => ({ ...prev, emotion }));
    navigate(`/?emotion=${emotion}${filters.theme ? `&theme=${filters.theme}` : ''}`);
  };

  const handleThemeClick = (theme: Theme) => {
    setFilters(prev => ({ ...prev, theme }));
    navigate(`/?theme=${theme}${filters.emotion ? `&emotion=${filters.emotion}` : ''}`);
  };

  const clearFilters = () => {
    setFilters(prev => ({ ...prev, emotion: undefined, theme: undefined }));
    navigate('/');
  };

  const handleFilterChange = (newFilters: {
    emotion?: Emotion;
    theme?: Theme;
    mode?: WhisperMode;
    visualMode: VisualMode;
  }) => {
    setFilters(newFilters);
    
    // Update URL if emotion or theme filters change
    const params = new URLSearchParams();
    if (newFilters.emotion) params.set('emotion', newFilters.emotion);
    if (newFilters.theme) params.set('theme', newFilters.theme);
    
    // Only navigate if the filters have actually changed
    if (
      newFilters.emotion !== emotionParam || 
      newFilters.theme !== themeParam
    ) {
      navigate(params.toString() ? `/?${params.toString()}` : '/');
    }
  };

  const getContainerClass = () => {
    switch (filters.visualMode) {
      case "foglie":
        return "bg-gradient-to-b from-green-50 via-green-200 to-green-100 bg-fixed";
      case "gocce":
        return "bg-gradient-to-b from-blue-100 via-blue-200 to-blue-100 bg-fixed";
      case "nebbia":
        return "bg-gradient-to-br from-gray-100 via-purple-100 to-blue-100 bg-fixed";
      default:
        return "bg-gradient-to-br from-limbus-100 via-purple-100 to-blue-200 bg-fixed";
    }
  };

  const getCardClass = () => {
    switch (filters.visualMode) {
      case "foglie":
        return "animate-float shadow-glow border-green-200";
      case "gocce":
        return "bg-white/40 border-white/30 backdrop-blur-sm shadow-glow";
      case "nebbia":
        return "backdrop-blur-md bg-white/20 shadow-glow";
      default:
        return "shadow-glow border-limbus-200";
    }
  };

  return (
    <div className={cn("min-h-screen transition-colors duration-500 relative overflow-hidden", getContainerClass())}>
      {/* Elementi decorativi di sfondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-purple-300/20 blur-3xl"></div>
        <div className="absolute top-1/3 -left-20 w-80 h-80 rounded-full bg-limbus-300/20 blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-60 h-60 rounded-full bg-blue-300/20 blur-3xl"></div>
        
        {filters.visualMode === "standard" && (
          <>
            <div className="absolute top-10 left-10 w-4 h-4 rounded-full bg-limbus-400/60 animate-pulse-slow"></div>
            <div className="absolute top-32 right-24 w-3 h-3 rounded-full bg-purple-400/60 animate-pulse-slow"></div>
            <div className="absolute bottom-20 left-1/3 w-5 h-5 rounded-full bg-blue-400/60 animate-pulse-slow"></div>
            <div className="absolute bottom-40 right-40 w-2 h-2 rounded-full bg-limbus-400/60 animate-pulse-slow"></div>
          </>
        )}
      </div>

      {/* Header/Navbar */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-limbus-100/80 via-purple-100/80 to-blue-100/80 backdrop-blur-md shadow-md border-b border-limbus-200">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 text-limbus-900 hover:text-limbus-600 transition-colors">
            <Home className="h-5 w-5" />
            <span className="font-medium">Home</span>
          </Link>
          
          <div className="text-center font-bold text-2xl bg-gradient-to-r from-limbus-600 to-purple-600 text-transparent bg-clip-text animate-glow-pulse shadow-glow-intense">
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

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-limbus-700 via-purple-600 to-blue-600 text-transparent bg-clip-text animate-glow-pulse mb-2">
              I tuoi sussurri
            </h1>
            <div className="w-24 h-1 mx-auto bg-gradient-to-r from-limbus-500 to-purple-500 rounded-full mb-4"></div>
            <p className="text-center text-gray-600 mb-4 max-w-md mx-auto animate-fade-in">
              Condividi i tuoi pensieri anonimi e scopri quelli degli altri. Un luogo dove le parole si librano nell'aria.
            </p>
            <div className="flex justify-center gap-3 opacity-70">
              <Wind className="h-5 w-5 text-blue-600 animate-foglia" />
              <Flame className="h-5 w-5 text-orange-500 animate-pulse-slow" />
              <Sparkles className="h-5 w-5 text-purple-500 animate-glow-pulse" />
            </div>
          </div>
          
          {/* Active filters display */}
          {(filters.emotion || filters.theme) && (
            <div className="mb-4 flex flex-wrap gap-2 justify-center items-center animate-fade-in">
              <span className="text-xs text-gray-600">Filtri attivi:</span>
              {filters.emotion && (
                <Badge 
                  className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white flex items-center gap-1 px-3 py-1"
                  variant="default"
                >
                  {filters.emotion}
                  <button 
                    onClick={() => {
                      setFilters(prev => ({ ...prev, emotion: undefined }));
                      const params = new URLSearchParams(location.search);
                      params.delete('emotion');
                      navigate(params.toString() ? `/?${params.toString()}` : '/');
                    }}
                    className="ml-1 rounded-full hover:bg-white/20 p-0.5"
                    aria-label="Rimuovi filtro emozione"
                  >
                    <X size={12} />
                  </button>
                </Badge>
              )}
              {filters.theme && (
                <Badge 
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white flex items-center gap-1 px-3 py-1"
                  variant="default"
                >
                  {filters.theme}
                  <button 
                    onClick={() => {
                      setFilters(prev => ({ ...prev, theme: undefined }));
                      const params = new URLSearchParams(location.search);
                      params.delete('theme');
                      navigate(params.toString() ? `/?${params.toString()}` : '/');
                    }}
                    className="ml-1 rounded-full hover:bg-white/20 p-0.5"
                    aria-label="Rimuovi filtro tema"
                  >
                    <X size={12} />
                  </button>
                </Badge>
              )}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearFilters}
                className="text-xs text-gray-500 hover:text-limbus-600 p-1 h-auto"
              >
                Cancella tutti
              </Button>
            </div>
          )}
          
          <WhisperForm onWhisperCreated={handleRefresh} />
          
          <div className="mt-8">
            <WhisperFilter onFilterChange={handleFilterChange} />
            
            {loading ? (
              <div className="flex justify-center py-20">
                <div className="p-6 glass-card rounded-xl text-center">
                  <Loader2 className="h-8 w-8 animate-spin text-limbus-600 mx-auto mb-2" />
                  <p className="text-limbus-600">Caricamento dei sussurri...</p>
                </div>
              </div>
            ) : error ? (
              <div className="text-center py-10 bg-red-50 bg-opacity-70 rounded-xl border border-red-200 shadow-md">
                <div className="p-6">
                  <span className="text-red-500 text-4xl mb-4 block">😢</span>
                  <h3 className="text-red-600 font-medium mb-2">Impossibile caricare i sussurri</h3>
                  <p className="text-red-500">Si è verificato un errore nel caricare i sussurri. Riprova più tardi.</p>
                </div>
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
                    onEmotionClick={handleEmotionClick}
                    onThemeClick={handleThemeClick}
                  />
                ))}
                
                {whispers.length === 0 && (
                  <div className="text-center py-10 animate-fade-in rounded-lg p-8 glass-card">
                    <span className="text-4xl mb-4 block">🔍</span>
                    <h3 className="text-gray-700 font-medium mb-2">Nessun sussurro trovato</h3>
                    <p className="text-gray-500">Prova a modificare i filtri o a creare il primo sussurro.</p>
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
