
import { motion } from "framer-motion";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Star, MessageCircle, Sparkles, SendHorizontal } from "lucide-react";

export const DemoWhisperSection = () => {
  const [demoWhisper, setDemoWhisper] = useState("");
  const [isGlowing, setIsGlowing] = useState(false);

  // Handle animation effects when typing
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDemoWhisper(e.target.value);
    
    // Trigger glow effect when typing
    if (!isGlowing && e.target.value.length > 0) {
      setIsGlowing(true);
      setTimeout(() => setIsGlowing(false), 1000);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-20 relative"
    >
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/5"
            style={{
              width: Math.random() * 6 + 2,
              height: Math.random() * 6 + 2,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50],
              opacity: [0, 0.2, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              repeatDelay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.h2 
            className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white/95 to-white/75"
            animate={{ 
              backgroundPosition: ['0% center', '100% center', '0% center'],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            Prova l'esperienza
          </motion.h2>
          <p className="text-white/80 max-w-xl mx-auto">
            Scrivi un pensiero, un'emozione, un ricordo - qualsiasi cosa tu voglia condividere
          </p>
        </motion.div>

        <motion.div 
          className="relative backdrop-blur-xl bg-white/5 p-6 rounded-2xl border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)] overflow-hidden"
          whileHover={{ boxShadow: "0 4px 30px rgba(255,255,255,0.05)" }}
          animate={isGlowing ? {
            boxShadow: ["0 4px 20px rgba(255,255,255,0.01)", "0 4px 25px rgba(255,255,255,0.08)", "0 4px 20px rgba(255,255,255,0.01)"]
          } : {}}
          transition={{
            boxShadow: { duration: 1, ease: "easeInOut" }
          }}
        >
          {/* Animated particle effects inside the card */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white/5"
                style={{
                  width: Math.random() * 4 + 1,
                  height: Math.random() * 4 + 1,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -20],
                  opacity: [0, 0.2, 0],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                }}
              />
            ))}
          </div>

          <div className="relative z-10">
            <div className="flex items-center mb-3">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="mr-2"
              >
                <Sparkles className="h-5 w-5 text-white/70" />
              </motion.div>
              <h3 className="text-white/80 font-medium">Il tuo pensiero</h3>
            </div>
            
            <Textarea
              value={demoWhisper}
              onChange={handleInputChange}
              placeholder="Scrivi il tuo pensiero qui..."
              className="h-32 mb-4 bg-white/5 border-white/10 focus:border-white/20 placeholder:text-white/40 text-white/90"
            />
            
            <div className="flex justify-between items-center">
              <div className="flex space-x-3">
                <motion.button 
                  className="text-white/60 hover:text-white/90 transition"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Heart className="h-5 w-5" />
                </motion.button>
                <motion.button 
                  className="text-white/60 hover:text-white/90 transition"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Star className="h-5 w-5" />
                </motion.button>
                <motion.button 
                  className="text-white/60 hover:text-white/90 transition"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <MessageCircle className="h-5 w-5" />
                </motion.button>
              </div>
              
              <motion.button
                className="backdrop-blur-md bg-white/10 border border-white/10 px-5 py-2 rounded-lg text-white hover:bg-white/15 hover:border-white/20 group relative overflow-hidden transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setDemoWhisper("")}
              >
                {/* Button shimmer effect */}
                <motion.div 
                  className="absolute inset-0 w-[200%] translate-x-[-100%] bg-gradient-to-r from-transparent via-white/10 to-transparent" 
                  animate={{ translateX: ['100%', '-100%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
                
                <span className="relative z-10 flex items-center">
                  <SendHorizontal size={14} className="inline mr-2" />
                  Condividi
                </span>
              </motion.button>
            </div>
          </div>
        </motion.div>
        
        {/* Interactive tips */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-8 flex justify-center"
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md bg-white/5 border border-white/10 text-white/70 text-sm"
            animate={{ 
              boxShadow: ["0 0 0px rgba(255,255,255,0)", "0 0 10px rgba(255,255,255,0.1)", "0 0 0px rgba(255,255,255,0)"]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          >
            <Sparkles size={14} className="text-white/60" />
            <span>Prova a scrivere qualcosa di ispirazionale</span>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};
