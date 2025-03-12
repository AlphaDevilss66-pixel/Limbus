
import { useRef } from 'react';
import { motion } from 'framer-motion';

interface ParallaxLayersProps {
  sliderRef: React.RefObject<HTMLDivElement>;
}

export const ParallaxLayers = ({ sliderRef }: ParallaxLayersProps) => {
  // No longer used for parallax effect
  return (
    <>
      {/* Static decorative elements replacing the previous parallax layers */}
      <div className="absolute inset-0 z-[1]">
        {/* Large colorful static elements */}
        <motion.div 
          className="absolute top-[10%] left-[10%] w-40 h-40 bg-gradient-to-br from-purple-500/30 to-indigo-500/30 rounded-full blur-md"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <motion.div 
          className="absolute bottom-[15%] right-[15%] w-48 h-48 bg-gradient-to-br from-blue-500/30 to-cyan-500/30 rounded-full blur-md"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        
        <motion.div 
          className="absolute top-[40%] right-[20%] w-32 h-32 bg-gradient-to-tr from-pink-500/30 to-purple-500/30 rounded-lg rotate-45 blur-md"
          animate={{ 
            rotate: [45, 60, 45],
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <motion.div 
          className="absolute top-[20%] right-[40%] w-24 h-24 bg-gradient-to-tr from-amber-500/30 to-pink-500/30 rounded-lg blur-md"
          animate={{ 
            scale: [1, 1.15, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
        
        {/* Small particles for a starry effect */}
        {[...Array(60)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/50 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.7 + 0.3,
            }}
            animate={{
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>
    </>
  );
};
