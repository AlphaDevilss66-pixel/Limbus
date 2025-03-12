
import { motion } from 'framer-motion';

export const SliderHeading = () => {
  return (
    <motion.h2 
      className="text-3xl md:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent"
      animate={{ 
        textShadow: ["0 0 10px rgba(255,255,255,0.3)", "0 0 20px rgba(255,255,255,0.5)", "0 0 10px rgba(255,255,255,0.3)"]
      }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      Un'esperienza immersiva
    </motion.h2>
  );
};
