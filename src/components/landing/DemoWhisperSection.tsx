
import { motion } from "framer-motion";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Star, MessageCircle } from "lucide-react";

export const DemoWhisperSection = () => {
  const [demoWhisper, setDemoWhisper] = useState("");

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-20 relative"
    >
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

        <div className="relative bg-purple-900/30 backdrop-blur-xl p-6 rounded-2xl border border-purple-500/30 shadow-glow overflow-hidden">
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
            <Textarea
              value={demoWhisper}
              onChange={(e) => setDemoWhisper(e.target.value)}
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
                className="bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-2 rounded-lg text-white shadow-glow-intense"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setDemoWhisper("")}
              >
                Sussurra
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
