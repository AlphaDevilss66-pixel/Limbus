import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { WhisperCard } from "@/components/WhisperCard";
import { WhisperForm } from "@/components/WhisperForm";
import { WhisperFilter } from "@/components/WhisperFilter";
import { Emotion, Theme, VisualMode, WhisperMode } from "@/types";
import { cn } from "@/lib/utils";
import { useWhispers } from "@/hooks/useWhispers";
import { 
  Loader2, LogOut, Home, Sparkles, Wind, Flame, X, 
  Feather, Stars, Globe, Moon, Sun, Orbit, Mic, 
  Zap, Heart, BookOpenCheck, Atom
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";

// Enhanced space particles with various sizes and animations
const SpaceParticles = ({ count = 100 }) => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden">
    {Array.from({ length: count }).map((_, i) => {
      const size = Math.random() * 4 + 1;
      const delay = Math.random() * 5;
      const duration = Math.random() * 8 + 3;
      const initialX = Math.random() * 100;
      const initialY = Math.random() * 100;
      
      return (
        <motion.div
          key={i}
          className={cn(
            "absolute rounded-full",
            i % 5 === 0 ? "bg-blue-300" : 
            i % 4 === 0 ? "bg-purple-300" : 
            i % 3 === 0 ? "bg-pink-300" : "bg-white"
          )}
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: `${initialX}%`,
            top: `${initialY}%`,
            opacity: Math.random() * 0.7 + 0.3,
            filter: i % 8 === 0 ? "blur(1px)" : "none",
          }}
          animate={{
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.5, 1],
            x: [0, Math.random() * 20 - 10, 0],
            y: [0, Math.random() * 20 - 10, 0],
          }}
          transition={{
            duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay,
          }}
        />
      );
    })}
  </div>
);

// Floating cosmic objects
const CosmicObjects = () => {
  const objects = [
    { icon: Stars, color: "text-amber-400", size: 28, x: 15, y: 25, duration: 18, delay: 0 },
    { icon: Moon, color: "text-blue-300", size: 20, x: 80, y: 15, duration: 15, delay: 2 },
    { icon: Globe, color: "text-indigo-400", size: 32, x: 70, y: 80, duration: 20, delay: 1 },
    { icon: Sun, color: "text-orange-300", size: 24, x: 25, y: 70, duration: 22, delay: 3 },
    { icon: Atom, color: "text-cyan-400", size: 26, x: 85, y: 40, duration: 25, delay: 4 },
  ];
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {objects.map((obj, i) => {
        const Icon = obj.icon;
        
        return (
          <motion.div
            key={i}
            className={`absolute ${obj.color} opacity-30`}
            style={{
              left: `${obj.x}%`,
              top: `${obj.y}%`,
            }}
            animate={{
              y: [0, -15, 0, 15, 0],
              x: [0, 10, 0, -10, 0],
              rotate: [0, 10, 0, -10, 0],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: obj.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: obj.delay,
            }}
          >
            <Icon size={obj.size} />
          </motion.div>
        );
      })}
    </div>
  );
};

// Nebula effect
const NebulaEffect = () => (
  <div className="fixed inset-0 pointer-events-none">
    <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-indigo-800/5 to-blue-900/10 animate-gradient-shift"></div>
    {[...Array(4)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full opacity-10 blur-3xl"
        style={{
          background: i % 2 === 0 
            ? "radial-gradient(circle, rgba(139,92,246,0.4) 0%, rgba(79,70,229,0.1) 70%, rgba(0,0,0,0) 100%)" 
            : "radial-gradient(circle, rgba(216,180,254,0.4) 0%, rgba(129,140,248,0.1) 70%, rgba(0,0,0,0) 100%)",
          width: `${Math.random() * 50 + 30}%`,
          height: `${Math.random() * 50 + 30}%`,
          left: `${Math.random() * 70}%`,
          top: `${Math.random() * 70}%`,
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.15, 0.1],
          x: [0, 10, 0],
          y: [0, 10, 0],
        }}
        transition={{
          duration: Math.random() * 30 + 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    ))}
  </div>
);

// Orbital element with enhanced animations
const OrbitalElement = ({ 
  icon: Icon, 
  size = 60, 
  duration = 20, 
  delay = 0, 
  radius = 180, 
  color = "text-blue-400",
  initialAngle = 0 
}) => {
  return (
    <motion.div
      className="absolute"
      style={{
        width: size,
        height: size,
        transformOrigin: "center center",
        transform: `rotate(${initialAngle}deg)`,
      }}
      animate={{
        rotate: [initialAngle, initialAngle + 360],
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
        whileHover={{ scale: 1.2, boxShadow: "0 0 25px rgba(139, 92, 246, 0.5)" }}
        animate={{ 
          boxShadow: ["0 0 15px rgba(139, 92, 246, 0.3)", "0 0 25px rgba(139, 92, 246, 0.5)", "0 0 15px rgba(139, 92, 246, 0.3)"]
        }}
        transition={{ 
          boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <Icon size={size / 2} />
      </motion.div>
    </motion.div>
  );
};

// Magic portal effect for the central part
const MagicPortal = () => (
  <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
    <motion.div
      className="w-[600px] h-[600px] opacity-10"
      style={{
        background: "radial-gradient(circle, rgba(167,139,250,0.5) 0%, rgba(139,92,246,0.2) 40%, rgba(0,0,0,0) 70%)",
      }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.1, 0.15, 0.1],
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  </div>
);

// Constellation lines
const ConstellationLines = () => {
  return (
    <svg className="fixed inset-0 w-full h-full pointer-events-none opacity-10" xmlns="http://www.w3.org/2000/svg">
      <g stroke="rgba(167, 139, 250, 0.5)" strokeWidth="0.5">
        {/* Random constellation lines */}
        <motion.path
          d="M100,200 L250,150 L400,300 L550,180 L700,250"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        />
        <motion.path
          d="M300,100 L450,220 L600,150 L750,300"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 6, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 2 }}
        />
        <motion.path
          d="M150,400 L250,350 L400,450 L550,380"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 1 }}
        />
      </g>
    </svg>
  );
};

// Main component
const Index = () => {
  const { signOut, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const whisperFormRef = useRef(null);
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

  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);

  useEffect(() => {
    // Hide welcome message after 5 seconds
    const timer = setTimeout(() => {
      setShowWelcomeMessage(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

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
    navigate(`/filtered/${emotion}`);
  };

  const handleThemeClick = (theme: Theme) => {
    navigate(`/filtered/${theme}`);
  };

  const clearFilters = () => {
    setFilters(prev => ({ ...prev, emotion: undefined, theme: undefined }));
    navigate('/');
  };

  const scrollToNewWhisper = () => {
    whisperFormRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
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

  return (
    <div className={cn("min-h-screen transition-colors duration-1000 relative overflow-hidden", getContainerClass())}>
      {/* Enhanced background effects */}
      <SpaceParticles count={200} />
      <NebulaEffect />
      <CosmicObjects />
      <ConstellationLines />
      <MagicPortal />
      
      {/* Orbital animations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
        <div className="relative w-[800px] h-[800px]">
          <OrbitalElement icon={Globe} size={50} duration={30} radius={350} color="text-purple-500" delay={2} initialAngle={0} />
          <OrbitalElement icon={Moon} size={30} duration={15} radius={250} color="text-blue-400" initialAngle={120} />
          <OrbitalElement icon={Stars} size={40} duration={25} radius={300} color="text-amber-400" delay={5} initialAngle={240} />
          <OrbitalElement icon={Atom} size={35} duration={40} radius={400} color="text-cyan-400" delay={3} initialAngle={60} />
          <OrbitalElement icon={Heart} size={25} duration={20} radius={280} color="text-pink-400" delay={1} initialAngle={180} />
        </div>
      </div>
      
      {/* Enhanced header with animations */}
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
            animate={{ 
              textShadow: ['0 0 5px rgba(139, 92, 246, 0.5)', '0 0 20px rgba(139, 92, 246, 0.8)', '0 0 5px rgba(139, 92, 246, 0.5)'] 
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ 
                rotate: 360,
                scale: [1, 1.2, 1],
              }}
              transition={{ 
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
              }}
              className="mr-2"
            >
              <Sparkles className="h-6 w-6 text-purple-400" />
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

      <div className="container mx-auto px-4 py-6 relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* Welcome message with disappearing animation */}
          <AnimatePresence>
            {showWelcomeMessage && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="mb-6 p-4 rounded-xl bg-gradient-to-r from-purple-600/30 to-indigo-600/30 backdrop-blur-md border border-purple-500/30 shadow-glow text-center"
              >
                <motion.div 
                  animate={{ 
                    scale: [1, 1.05, 1],
                    rotate: [-1, 1, -1]
                  }} 
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  className="text-2xl mb-2"
                >
                  ✨
                </motion.div>
                <h3 className="text-purple-200 font-medium mb-1">Bentornato nell'universo dei sussurri!</h3>
                <p className="text-purple-300 text-sm">Condividi i tuoi pensieri o esplora quelli degli altri.</p>
              </motion.div>
            )}
          </AnimatePresence>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8 text-center"
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
              I tuoi sussurri
            </motion.h1>
            <motion.div 
              className="w-32 h-1 mx-auto bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-5"
              animate={{ 
                width: ['8rem', '12rem', '8rem'],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            ></motion.div>
            <motion.p 
              className="text-center text-purple-200 mb-5 max-w-md mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              Condividi i tuoi pensieri nell'infinito universo e scopri quelli degli altri.
            </motion.p>
            
            <div className="flex justify-center gap-2 flex-wrap mb-4">
              <Link to="/biblioteca">
                <Button variant="outline" className="bg-purple-900/30 border-purple-500/30 text-purple-200 hover:bg-purple-700/40 hover:text-white transition-all">
                  <motion.span
                    animate={{ 
                      rotate: [0, 3, 0, -3, 0],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{ 
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="mr-2"
                  >
                    <BookOpenCheck size={16} className="text-purple-300" />
                  </motion.span>
                  <span className="relative">
                    Biblioteca Invisibile
                    <motion.span 
                      className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-md blur-sm -z-10"
                      animate={{ 
                        opacity: [0, 0.5, 0] 
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                      }}
                    />
                  </span>
                </Button>
              </Link>
              <Link to="/passato">
                <Button variant="outline" className="bg-blue-900/30 border-blue-500/30 text-blue-200 hover:bg-blue-700/40 hover:text-white transition-all">
                  <motion.span
                    animate={{ 
                      rotate: [0, -3, 0, 3, 0],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{ 
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="mr-2"
                  >
                    <Mic size={16} className="text-blue-300" />
                  </motion.span>
                  <span className="relative">
                    Voci dal Passato
                    <motion.span 
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-md blur-sm -z-10"
                      animate={{ 
                        opacity: [0, 0.5, 0] 
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity, 
                        ease: "easeInOut",
                        delay: 1.5
                      }}
                    />
                  </span>
                </Button>
              </Link>
            </div>

            {/* Quick action button to create new whisper */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="mt-4"
            >
              <Button
                onClick={scrollToNewWhisper}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-glow-purple"
              >
                <motion.span
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                  className="mr-2"
                >
                  <Zap size={16} />
                </motion.span>
                Crea un nuovo sussurro
              </Button>
            </motion.div>
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
                  <motion.span
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    {filters.emotion}
                  </motion.span>
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
                  <motion.span
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  >
                    {filters.theme}
                  </motion.span>
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
                <motion.span
                  whileHover={{ rotate: 90 }}
                  transition={{ duration: 0.3 }}
                >
                  <X size={10} className="mr-1" />
                </motion.span>
                Cancella tutti
              </Button>
            </motion.div>
          )}
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-purple-900/30 backdrop-blur-xl p-6 rounded-2xl border border-purple-500/30 shadow-glow relative overflow-hidden"
            ref={whisperFormRef}
          >
            {/* Animated particles inside form container */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-white/10"
                  style={{
                    width: Math.random() * 8 + 3,
                    height: Math.random() * 8 + 3,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -30],
                    opacity: [0, 0.5, 0],
                  }}
                  transition={{
                    duration: Math.random() * 5 + 3,
                    repeat: Infinity,
                    repeatDelay: Math.random() * 3,
                  }}
                />
              ))}
            </div>
            
            <WhisperForm onWhisperCreated={handleRefresh} />
          </motion.div>
          
          <div className="mt-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-purple-900/20 backdrop-blur-xl p-5 rounded-xl border border-purple-500/30 shadow-glow-purple mb-8 relative overflow-hidden"
            >
              {/* Animated background for filter container */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-indigo-500/5"
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </div>
