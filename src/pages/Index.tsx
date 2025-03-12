import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { WhisperCard } from "@/components/WhisperCard";
import { WhisperForm } from "@/components/WhisperForm";
import { WhisperFilter } from "@/components/WhisperFilter";
import { Emotion, Theme, VisualMode, WhisperMode } from "@/types";
import { cn } from "@/lib/utils";
import { useWhispers } from "@/hooks/useWhispers";
import { Loader2, LogOut, Home, Sparkles, Wind, Flame, X, Feather, Stars, Rocket, Globe, Moon, Sun, Orbit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { ImageSlider3D } from "@/components/ImageSlider3D";

const SpaceParticles = ({ count = 50 }) => (
  <div className="fixed inset-0 pointer-events-none">
    {Array.from({ length: count }).map((_, i) => (
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
);

const OrbitalElement = ({ icon: Icon, size = 60, duration = 20, delay = 0, radius = 180, color = "text-blue-400" }) => {
  return (
    <motion.div
      className="absolute"
      style={{
        width: size,
        height: size,
      }}
      animate={{
        rotate: 360,
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "linear",
        delay,
      }}
    >
      <motion.div
        className={`absolute flex items-center justify-center rounded-full backdrop-blur-sm ${color} bg-white/10 p-3 shadow-glow`}
        style={{
          left: `calc(50% + ${radius}px)`,
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: size,
          height: size,
        }}
        whileHover={{ scale: 1.2 }}
      >
        <Icon size={size / 2} />
      </motion.div>
    </motion.div>
  );
};

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
    
    const params = new URLSearchParams();
    if (newFilters.emotion) params.set('emotion', newFilters.emotion);
    if (newFilters.theme) params.set('theme', newFilters.theme);
    
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
        return "bg-gradient-to-b from-blue-100 via-blue-300 to-blue-100 bg-fixed";
      case "nebbia":
        return "bg-gradient-to-br from-gray-100 via-purple-100 to-blue-100 bg-fixed";
      default:
        return "bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-purple-900 to-slate-900 bg-fixed";
    }
  };

  const getCardClass = () => {
    switch (filters.visualMode) {
      case "foglie":
        return "animate-float shadow-glow-intense border-green-200 bg-white/60";
      case "gocce":
        return "bg-white/40 border-white/30 backdrop-blur-sm shadow-glow-blue";
      case "nebbia":
        return "backdrop-blur-md bg-white/20 shadow-glow-purple";
      default:
        return "shadow-glow-intense bg-white/10 backdrop-blur-xl border-purple-500/30 hover:border-purple-400/50 text-white";
    }
  };

  // Images for the 3D slider
  const spaceImages = [
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg"
  ];

  return (
    <div className={cn("min-h-screen transition-colors duration-1000 relative overflow-hidden", getContainerClass())}>
      <SpaceParticles count={200} />
      
      <div className="fixed inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
        <div className="relative w-[800px] h-[800px]">
          <OrbitalElement icon={Globe} size={50} duration={30} radius={350} color="text-purple-500" delay={2} />
          <OrbitalElement icon={Moon} size={30} duration={15} radius={250} color="text-blue-400" />
          <OrbitalElement icon={Stars} size={40} duration={25} radius={300} color="text-amber-400" delay={5} />
        </div>
      </div>
      
      <header className="sticky top-0 z-50 bg-gradient-to-r from-purple-900/90 via-slate-800/90 to-purple-800/90 backdrop-blur-lg shadow-md border-b border-purple-500/20">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 text-purple-300 hover:text-purple-200 transition-colors">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Home className="h-5 w-5" />
            </motion.div>
            <span className="font-medium">Home</span>
          </Link>
          
          <motion.div 
            className="text-center font-bold text-2xl bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text flex items-center"
            animate={{ textShadow: ['0 0 5px rgba(139, 92, 246, 0.5)', '0 0 20px rgba(139, 92, 246, 0.8)', '0 0 5px rgba(139, 92, 246, 0.5)'] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="h-6 w-6 mr-2 text-purple-400" />
            </motion.div>
            <span className="tracking-wider">LIMBUS</span>
          </motion.div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={signOut}
            className="flex items-center gap-1 text-purple-300 hover:text-red-400 hover:bg-red-900/20 transition-colors"
          >
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
            >
              <LogOut className="h-4 w-4" />
            </motion.div>
            <span className="hidden sm:inline">Esci</span>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-2xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12 text-center"
          >
            <motion.h1 
              className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-purple-300 text-transparent bg-clip-text mb-3"
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
              I tuoi sussurri cosmici
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
              Condividi i tuoi pensieri nell'infinito universo e scopri quelli degli altri. Un luogo dove le parole attraversano lo spazio-tempo.
            </motion.p>
            <div className="flex justify-center gap-6 text-purple-300 opacity-80">
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Wind className="h-7 w-7 text-blue-400" />
              </motion.div>
              <motion.div
                animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Flame className="h-7 w-7 text-orange-400" />
              </motion.div>
              <motion.div
                animate={{ rotate: [0, 10, 0, -10, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <Stars className="h-7 w-7 text-yellow-400" />
              </motion.div>
              <motion.div
                animate={{ y: [0, -6, 0], x: [0, 4, 0, -4, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <Feather className="h-7 w-7 text-purple-400" />
              </motion.div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              >
                <Orbit className="h-7 w-7 text-blue-300" />
              </motion.div>
            </div>
          </motion.div>
          
          {/* Space Slider Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mb-12 relative z-10"
          >
            <ImageSlider3D images={spaceImages} />
          </motion.div>
          
          {(filters.emotion || filters.theme) && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-6 flex flex-wrap gap-2 justify-center items-center"
            >
              <span className="text-xs text-purple-300">Filtri attivi:</span>
              {filters.emotion && (
                <Badge 
                  className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white flex items-center gap-1 px-3 py-1 shadow-glow-purple"
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
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white flex items-center gap-1 px-3 py-1 shadow-glow-blue"
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
                className="text-xs text-purple-300 hover:text-purple-200 p-1 h-auto"
              >
                Cancella tutti
              </Button>
            </motion.div>
          )}
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-purple-900/30 backdrop-blur-xl p-6 rounded-2xl border border-purple-500/30 shadow-glow"
          >
            <WhisperForm onWhisperCreated={handleRefresh} />
          </motion.div>
          
          <div className="mt-12">
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
                  className="p-8 glass-card rounded-xl text-center shadow-glow bg-purple-900/20 backdrop-blur-xl border border-purple-500/30"
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
                "space-y-6 pt-6",
                filters.visualMode === "foglie" && "relative",
              )}>
                {whispers.map((whisper, index) => (
                  <motion.div
                    key={whisper.id}
                    initial={{ opacity: 0, y: 50, x: index % 2 === 0 ? -20 : 20 }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: index * 0.1,
                      type: "spring", 
                      stiffness: 100, 
                      damping: 10
                    }}
                    whileHover={{ 
                      scale: 1.02, 
                      rotate: index % 2 === 0 ? 1 : -1,
                      transition: { duration: 0.3 }
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
                ))}
                
                {whispers.length === 0 && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1, rotate: [0, 1, 0, -1, 0] }}
                    transition={{ 
                      duration: 0.5, 
                      rotate: { 
                        duration: 8, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                      } 
                    }}
                    className="text-center py-10 rounded-lg p-8 bg-purple-900/20 backdrop-blur-xl border border-purple-500/30 shadow-glow-purple"
                  >
                    <motion.div
                      animate={{ 
                        y: [0, -10, 0],
                        opacity: [0.7, 1, 0.7]
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                      }}
                      className="text-4xl mb-4 block"
                    >
                      🌠
                    </motion.div>
                    <h3 className="text-purple-200 font-medium mb-2">Il vuoto cosmico</h3>
                    <p className="text-purple-300/80">Prova a modificare i filtri o a creare il primo sussurro stellare.</p>
                  </motion.div>
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
