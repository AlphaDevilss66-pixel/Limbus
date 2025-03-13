
import { motion } from "framer-motion";

export const BackgroundEffects = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <motion.div 
        className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-white/5 blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
      <motion.div 
        className="absolute top-1/3 -left-40 w-[400px] h-[400px] rounded-full bg-white/5 blur-3xl"
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.15, 0.05, 0.15]
        }}
        transition={{ 
          duration: 15, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
      <motion.div 
        className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full bg-white/5 blur-3xl"
        animate={{ 
          scale: [1, 1.4, 1],
          opacity: [0.1, 0.25, 0.1]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
    </div>
  );
};
