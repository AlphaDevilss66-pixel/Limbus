
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { WhisperCard } from "@/components/WhisperCard";
import { WhisperFilter } from "@/components/WhisperFilter";
import { Emotion, Theme, VisualMode, WhisperMode } from "@/types";
import { cn } from "@/lib/utils";
import { useWhispers } from "@/hooks/useWhispers";
import { Loader2, ArrowLeft, Sparkles, SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const FilteredWhispers = () => {
  const { filter } = useParams<{ filter: string }>();
  const navigate = useNavigate();
  
  // Determina se il filtro è un'emozione o un tema
  const isEmotion = ["Felicità", "Tristezza", "Rabbia", "Nostalgia", "Speranza", "Paura"].includes(filter as string);
  const isTheme = ["Amore", "Solitudine", "Ricordi", "Vita", "Morte", "Sogni", "Desideri", "Fallimenti"].includes(filter as string);
  
  const [filters, setFilters] = useState<{
    emotion?: Emotion;
    theme?: Theme;
    mode?: WhisperMode;
    visualMode: VisualMode;
  }>({
    emotion: isEmotion ? filter as Emotion : undefined,
    theme: isTheme ? filter as Theme : undefined,
    visualMode: "standard",
  });

  const { whispers, loading, error, refresh } = useWhispers({
    emotion: filters.emotion,
    theme: filters.theme,
    mode: filters.mode,
  });

  const handleRefresh = () => {
    refresh();
  };

  const handleEmotionClick = (emotion: Emotion) => {
    navigate(`/filtered/${emotion}`);
  };

  const handleThemeClick = (theme: Theme) => {
    navigate(`/filtered/${theme}`);
  };

  const handleFilterChange = (newFilters: {
    emotion?: Emotion;
    theme?: Theme;
    mode?: WhisperMode;
    visualMode: VisualMode;
  }) => {
    setFilters(newFilters);
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
        return "bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-purple-900 to-slate-900 bg-fixed";
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
        return "shadow-glow-intense bg-white/10 backdrop-blur-xl border-purple-500/30 hover:border-purple-400/50 text-white";
    }
  };

  return (
    <div className={cn("min-h-screen transition-colors duration-500 relative overflow-hidden", getContainerClass())}>
      {/* Elementi decorativi di sfondo */}
      <div className="fixed inset-0 pointer-events-none">
        {Array.from({ length: 150 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.7 + 0.3,
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Header/Navbar */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-purple-900/90 via-slate-800/90 to-purple-800/90 backdrop-blur-lg shadow-md border-b border-purple-500/20">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate("/whispers")}
            className="flex items-center gap-2 text-purple-300 hover:text-purple-200 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Torna indietro</span>
          </Button>
          
          <motion.div 
            className="text-center font-bold text-2xl bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text flex items-center"
            animate={{ textShadow: ['0 0 5px rgba(139, 92, 246, 0.5)', '0 0 20px rgba(139, 92, 246, 0.8)', '0 0 5px rgba(139, 92, 246, 0.5)'] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles className="h-5 w-5 mr-2 text-purple-400" />
            Sussurri filtrati
          </motion.div>
          
          <div className="w-28"></div> {/* Spazio vuoto per bilanciare l'header */}
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-2xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8 text-center"
          >
            <motion.h1 
              className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-purple-300 text-transparent bg-clip-text mb-3"
              animate={{ 
                backgroundPosition: ['0% center', '100% center', '0% center'],
                textShadow: ['0 0 10px rgba(139, 92, 246, 0.3)', '0 0 20px rgba(139, 92, 246, 0.5)', '0 0 10px rgba(139, 92, 246, 0.3)'] 
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            >
              {isEmotion ? `Emozione: ${filter}` : isTheme ? `Tema: ${filter}` : 'Sussurri filtrati'}
            </motion.h1>
            <motion.div 
              className="w-32 h-1 mx-auto bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-5"
              animate={{ width: ['8rem', '10rem', '8rem'] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            ></motion.div>
            <motion.p 
              className="text-center text-purple-200 mb-5 max-w-md mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              {isEmotion ? 'Sussurri che condividono la stessa emozione' : isTheme ? 'Sussurri che condividono lo stesso tema' : 'Sussurri filtrati in base ai tuoi criteri'}
            </motion.p>
          </motion.div>
          
          {/* Filtro attivo display */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-6 flex flex-wrap gap-2 justify-center items-center"
          >
            {isEmotion && (
              <Badge 
                className="bg-gradient-to-r from-pink-500 to-purple-500 text-white flex items-center gap-1 px-3 py-1 shadow-glow-purple"
                variant="default"
              >
                Emozione: {filter}
              </Badge>
            )}
            {isTheme && (
              <Badge 
                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white flex items-center gap-1 px-3 py-1 shadow-glow-blue"
                variant="default"
              >
                Tema: {filter}
              </Badge>
            )}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-purple-900/20 backdrop-blur-xl p-5 rounded-xl border border-purple-500/30 shadow-glow-purple mb-8"
          >
            <WhisperFilter onFilterChange={handleFilterChange} />
          </motion.div>
            
          {loading ? (
            <div className="flex justify-center py-20">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1, rotate: [0, 5, 0, -5, 0] }}
                transition={{ duration: 0.5, rotate: { duration: 5, repeat: Infinity, ease: "easeInOut" } }}
                className="p-8 rounded-xl text-center shadow-glow bg-purple-900/20 backdrop-blur-xl border border-purple-500/30"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                >
                  <Loader2 className="h-12 w-12 text-purple-400 mx-auto mb-3" />
                </motion.div>
                <p className="text-purple-300 font-medium">Viaggio nel cosmo dei sussurri...</p>
              </motion.div>
            </div>
          ) : error ? (
            <div className="text-center py-10 bg-red-900/20 backdrop-blur-xl rounded-xl border border-red-500/40 shadow-md">
              <div className="p-6">
                <span className="text-red-400 text-4xl mb-4 block">😢</span>
                <h3 className="text-red-300 font-medium mb-2">Anomalia nel sistema</h3>
                <p className="text-red-300/80">Si è verificato un errore nel caricare i sussurri. Riprova più tardi.</p>
              </div>
            </div>
          ) : (
            <div className={cn(
              "space-y-6 pt-4",
              filters.visualMode === "foglie" && "relative",
            )}>
              {whispers.length > 0 ? (
                whispers.map((whisper) => (
                  <motion.div
                    key={whisper.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: 0.1,
                      type: "spring", 
                      stiffness: 100, 
                      damping: 10
                    }}
                  >
                    <WhisperCard
                      whisper={whisper}
                      className={getCardClass()}
                      onUpdate={handleRefresh}
                      onEmotionClick={handleEmotionClick}
                      onThemeClick={handleThemeClick}
                    />
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1, y: [0, -5, 0] }}
                  transition={{ 
                    duration: 0.5, 
                    y: { 
                      duration: 3, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    } 
                  }}
                  className="text-center py-10 rounded-lg p-8 bg-purple-900/20 backdrop-blur-xl border border-purple-500/30 shadow-glow-purple"
                >
                  <motion.div
                    animate={{ 
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ 
                      duration: 5, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                    className="text-5xl mb-4 block mx-auto w-16 h-16 flex items-center justify-center"
                  >
                    <SearchX className="text-purple-300 w-16 h-16" />
                  </motion.div>
                  <h3 className="text-purple-200 font-medium text-2xl mb-2">Nessun sussurro trovato</h3>
                  <p className="text-purple-300/80 mb-6">Non sono ancora stati creati sussurri con {isEmotion ? `l'emozione "${filter}"` : isTheme ? `il tema "${filter}"` : 'questi criteri'}.</p>
                  
                  <Button 
                    variant="outline" 
                    onClick={() => navigate("/whispers")}
                    className="bg-purple-500/20 border-purple-400/30 text-purple-200 hover:bg-purple-500/40 hover:text-white transition-all shadow-glow"
                  >
                    Torna alla pagina principale
                  </Button>
                </motion.div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilteredWhispers;
