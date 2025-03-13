
import { motion } from "framer-motion";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Star, MessageCircle, Sparkles, Cloud, Zap } from "lucide-react";

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
        {[...Array(15)].map((_, i) => (
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
              y: [0, -50],
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

      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.h2 
            className="text-4xl font-bold mb-6 bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent"
            animate={{ 
              backgroundPosition: ['0% center', '100% center', '0% center'],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            Prova l'esperienza
          </motion.h2>
          <p className="text-indigo-100 max-w-xl mx-auto">
            Scrivi un pensiero, un'emozione, un ricordo - qualsiasi cosa tu voglia sussurrare all'universo
          </p>
        </motion.div>

        <motion.div 
          className="relative bg-purple-900/30 backdrop-blur-xl p-6 rounded-2xl border border-purple-500/30 shadow-glow overflow-hidden"
          whileHover={{ boxShadow: "0 0 30px rgba(139, 92, 246, 0.3), 0 0 60px rgba(139, 92, 246, 0.15)" }}
          animate={isGlowing ? {
            boxShadow: ["0 0 20px rgba(139, 92, 246, 0.2)", "0 0 40px rgba(139, 92, 246, 0.4)", "0 0 20px rgba(139, 92, 246, 0.2)"]
          } : {}}
          transition={{
            boxShadow: { duration: 1, ease: "easeInOut" }
          }}
        >
          {/* Animated particle effects inside the card */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white/10"
                style={{
                  width: Math.random() * 5 + 2,
                  height: Math.random() * 5 + 2,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -20],
                  opacity: [0, 0.5, 0],
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
                <Sparkles className="h-5 w-5 text-purple-300" />
              </motion.div>
              <h3 className="text-purple-200 font-medium">Il tuo sussurro</h3>
            </div>
            
            <Textarea
              value={demoWhisper}
              onChange={handleInputChange}
              placeholder="Scrivi il tuo sussurro qui..."
              className="h-32 mb-4 text-purple-900 dark:text-white placeholder:text-purple-400/70 focus:border-purple-400/50 relative bg-white/70 dark:bg-purple-900/20"
            />
            
            <div className="flex justify-between items-center">
              <div className="flex space-x-3">
                <motion.button 
                  className="text-purple-300 hover:text-purple-200 transition"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Heart className="h-5 w-5" />
                </motion.button>
                <motion.button 
                  className="text-purple-300 hover:text-purple-200 transition"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Star className="h-5 w-5" />
                </motion.button>
                <motion.button 
                  className="text-purple-300 hover:text-purple-200 transition"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <MessageCircle className="h-5 w-5" />
                </motion.button>
              </div>
              
              <motion.button
                className="bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-2 rounded-lg text-white shadow-glow-intense group relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setDemoWhisper("")}
              >
                {/* Button shimmer effect */}
                <motion.div 
                  className="absolute inset-0 w-[200%] translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent" 
                  animate={{ translateX: ['100%', '-100%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
                
                <span className="relative z-10 flex items-center">
                  <motion.span 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    className="mr-2"
                  >
                    <Cloud size={14} className="inline" />
                  </motion.span>
                  Sussurra
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-600/20 text-indigo-200 text-sm backdrop-blur-sm"
            animate={{ 
              boxShadow: ["0 0 0px rgba(99, 102, 241, 0)", "0 0 10px rgba(99, 102, 241, 0.3)", "0 0 0px rgba(99, 102, 241, 0)"]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          >
            <Zap size={14} className="text-indigo-300" />
            <span>Prova a scrivere qualcosa di ispirazionale</span>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};
