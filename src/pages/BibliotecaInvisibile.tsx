
import { useState, useEffect } from "react";
import { getLibraryWhispers } from "@/services/whisperService";
import { WhisperCard } from "@/components/WhisperCard";
import { Whisper } from "@/types";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookLock, Key, Lock, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";

const BibliotecaInvisibile = () => {
  const [whispers, setWhispers] = useState<Whisper[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadWhispers = async () => {
      try {
        setLoading(true);
        const data = await getLibraryWhispers();
        setWhispers(data);
      } catch (error) {
        console.error("Failed to fetch library whispers:", error);
        toast.error("Impossibile caricare i segreti della biblioteca");
      } finally {
        setLoading(false);
      }
    };

    loadWhispers();
  }, []);

  // Particles animation for the mystical atmosphere
  const particles = Array.from({ length: 30 }, (_, i) => i);

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-950 text-white overflow-hidden">
      {/* Animated background particles */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-indigo-500/20"
          initial={{
            width: Math.random() * 8 + 2,
            height: Math.random() * 8 + 2,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: Math.random() * 0.5,
          }}
          animate={{
            y: [null, "-100vh"],
            opacity: [null, 0],
          }}
          transition={{
            duration: Math.random() * 20 + 10,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5,
          }}
        />
      ))}

      {/* Mystical decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nNTAwJyBoZWlnaHQ9JzUwMCcgdmlld0JveD0nMCAwIDUwMCA1MDAnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PHJlY3Qgd2lkdGg9JzEwMCUnIGhlaWdodD0nMTAwJScgZmlsbD0nbm9uZScgLz48Y2lyY2xlIGN4PScyNTAnIGN5PScyNTAnIHI9JzEwMCcgc3Ryb2tlPScjOGI1Y2Y2MjAnIHN0cm9rZS13aWR0aD0nMC41JyBmaWxsPSdub25lJyAvPjxjaXJjbGUgY3g9JzI1MCcgY3k9JzI1MCcgcj0nMjAwJyBzdHJva2U9JyM4YjVjZjYxMCcgc3Ryb2tlLXdpZHRoPScwLjUnIGZpbGw9J25vbmUnIC8+PC9zdmc+')]"
          initial={{ opacity: 0.1, rotate: 0 }}
          animate={{ opacity: 0.15, rotate: 360 }}
          transition={{ duration: 200, repeat: Infinity, ease: "linear" }}
        />
        
        <div className="absolute top-1/4 -right-20 w-96 h-96 rounded-full bg-indigo-600/5 blur-3xl"></div>
        <div className="absolute bottom-1/4 -left-20 w-80 h-80 rounded-full bg-purple-600/10 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              size="sm" 
              className="font-medium text-indigo-200 hover:text-indigo-100 hover:bg-indigo-800/50"
              onClick={() => navigate("/whispers")}
            >
              <ArrowLeft size={16} className="mr-2" />
              Torna ai sussurri
            </Button>
          </div>

          <div className="text-center my-16">
            <motion.div 
              className="inline-flex items-center justify-center p-6 bg-indigo-500/20 rounded-full mb-6 border border-indigo-400/30 backdrop-blur-sm shadow-[0_0_15px_rgba(139,92,246,0.3)]"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <BookLock className="h-12 w-12 text-indigo-300" />
            </motion.div>
            <motion.h1 
              className="text-4xl font-bold mb-3 bg-gradient-to-r from-indigo-300 via-purple-200 to-indigo-300 text-transparent bg-clip-text"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Biblioteca Invisibile
            </motion.h1>
            <motion.div
              className="w-32 h-1 mx-auto bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mb-5"
              initial={{ width: 0 }}
              animate={{ width: 128 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            />
            <motion.p 
              className="text-indigo-200 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              Qui riposano i segreti più profondi e significativi. Solo chi ha condiviso un proprio pensiero può accedere a questa conoscenza nascosta, custodita per secoli dai Guardiani dell'Invisibile.
            </motion.p>
          </div>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-500 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Lock size={16} className="text-indigo-300" />
              </div>
            </div>
          </div>
        ) : whispers.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16 max-w-lg mx-auto"
          >
            <div className="p-10 rounded-2xl bg-indigo-500/10 backdrop-blur-md border border-indigo-400/20 shadow-[0_0_20px_rgba(99,102,241,0.15)]">
              <div className="bg-indigo-500/20 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <Lock size={32} className="text-indigo-300" />
              </div>
              <h3 className="text-xl font-medium text-indigo-100 mb-3">La biblioteca è chiusa</h3>
              <p className="text-indigo-200 mb-6">
                Per accedere ai segreti nascosti della biblioteca, devi prima condividere un tuo pensiero con il mondo.
              </p>
              <Button
                onClick={() => navigate("/whispers")}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/30"
              >
                <Key size={16} className="mr-2" />
                Condividi un pensiero
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="grid grid-cols-1 gap-8 max-w-2xl mx-auto"
          >
            {whispers.map((whisper, index) => (
              <motion.div
                key={whisper.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
              >
                <WhisperCard
                  whisper={whisper}
                  className="bg-gradient-to-br from-indigo-800/80 via-purple-800/80 to-indigo-900/80 border-indigo-500/30 text-indigo-100 shadow-[0_0_20px_rgba(99,102,241,0.2)]"
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BibliotecaInvisibile;
