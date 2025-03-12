
import { useState, useEffect } from "react";
import { getPastWhispers } from "@/services/whisperService";
import { WhisperCard } from "@/components/WhisperCard";
import { Whisper } from "@/types";
import { Button } from "@/components/ui/button";
import { ArrowLeft, History, Clock, Hourglass } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";

const VociPassato = () => {
  const [whispers, setWhispers] = useState<Whisper[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadWhispers = async () => {
      try {
        setLoading(true);
        const data = await getPastWhispers();
        setWhispers(data);
      } catch (error) {
        console.error("Failed to fetch past whispers:", error);
        toast.error("Impossibile caricare le voci dal passato");
      } finally {
        setLoading(false);
      }
    };

    loadWhispers();
  }, []);

  // Create animated sand particles
  const sandParticles = Array.from({ length: 50 }, (_, i) => i);

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-amber-800 via-amber-700 to-amber-900 text-amber-50 overflow-hidden">
      {/* Animated background elements */}
      {sandParticles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-amber-500/20"
          initial={{
            width: Math.random() * 6 + 2,
            height: Math.random() * 6 + 2,
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 10,
            opacity: Math.random() * 0.3 + 0.1,
          }}
          animate={{
            y: [null, -100],
            x: (i % 2 === 0) ? [null, "-20px"] : [null, "20px"],
            opacity: [null, 0],
          }}
          transition={{
            duration: Math.random() * 15 + 5,
            repeat: Infinity,
            ease: "easeOut",
            delay: Math.random() * 5,
          }}
        />
      ))}

      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMzAwJyBoZWlnaHQ9JzMwMCcgdmlld0JveD0nMCAwIDMwMCAzMDAnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PGRlZnM+PHBhdHRlcm4gaWQ9J3BhdHRlcm4nIHBhdGh0ZXJuVW5pdHM9J3VzZXJTcGFjZU9uVXNlJyB3aWR0aD0nMzAnIGhlaWdodD0nMzAnIHBhdGh0ZXJuVHJhbnNmb3JtPSdyb3RhdGUoNDUpJz48cmVjdCB3aWR0aD0nMScgaGVpZ2h0PSczMCcgeD0nMTQnIGZpbGw9JyNkOTc3MDYyMCcvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgZmlsbD0ncGF0dGVybignIHdpZHRoPScxMDAlJyBoZWlnaHQ9JzEwMCUnLz48L3N2Zz4=')]"
          initial={{ opacity: 0.05 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
        />
        
        <div className="absolute top-1/4 -right-20 w-96 h-96 rounded-full bg-amber-600/5 blur-3xl"></div>
        <div className="absolute bottom-1/4 -left-20 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl"></div>
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
              className="font-medium text-amber-200 hover:text-amber-100 hover:bg-amber-800/50"
              onClick={() => navigate("/whispers")}
            >
              <ArrowLeft size={16} className="mr-2" />
              Torna ai sussurri
            </Button>
          </div>

          <div className="text-center my-16">
            <motion.div 
              className="inline-flex items-center justify-center p-6 bg-amber-500/20 rounded-full mb-6 border border-amber-400/30 backdrop-blur-sm shadow-[0_0_15px_rgba(245,158,11,0.2)]"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <History className="h-12 w-12 text-amber-300" />
            </motion.div>
            <motion.h1 
              className="text-4xl font-bold mb-3 bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 text-transparent bg-clip-text"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Voci dal Passato
            </motion.h1>
            <motion.div
              className="w-32 h-1 mx-auto bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full mb-5"
              initial={{ width: 0 }}
              animate={{ width: 128 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            />
            <motion.p 
              className="text-amber-200 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              Pensieri dimenticati che ritornano per risuonare con nuove anime. Scopri sussurri dal passato che sono stati riportati alla luce, testimoni silenziosi di tempi ormai andati che ritrovano vita nel presente.
            </motion.p>
          </div>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-amber-200 border-t-amber-500 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Hourglass size={16} className="text-amber-300" />
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
            <div className="p-10 rounded-2xl bg-amber-500/10 backdrop-blur-md border border-amber-400/20 shadow-[0_0_20px_rgba(245,158,11,0.15)]">
              <div className="bg-amber-500/20 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <Clock size={32} className="text-amber-300" />
              </div>
              <h3 className="text-xl font-medium text-amber-100 mb-3">Nessuna voce dal passato</h3>
              <p className="text-amber-200 mb-6">
                Il tempo non ha ancora riportato alla luce sussurri dimenticati. Torna più tardi per scoprire pensieri dal passato.
              </p>
              <Button
                onClick={() => navigate("/whispers")}
                className="bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white shadow-lg shadow-amber-500/30"
              >
                <History size={16} className="mr-2" />
                Torna ai sussurri
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
                className="relative"
              >
                {/* Vintage paper effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-100/10 to-amber-200/5 rounded-2xl"></div>
                
                <WhisperCard
                  whisper={whisper}
                  className="bg-gradient-to-br from-amber-800/70 via-amber-700/70 to-amber-900/70 border-amber-500/30 text-amber-100 shadow-[0_0_20px_rgba(245,158,11,0.15)]"
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default VociPassato;
