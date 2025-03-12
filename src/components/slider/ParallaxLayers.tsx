
import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ParallaxLayersProps {
  sliderRef: React.RefObject<HTMLDivElement>;
}

export const ParallaxLayers = ({ sliderRef }: ParallaxLayersProps) => {
  const parallaxLayers = useRef<HTMLDivElement[]>([]);

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sliderRef.current) return;
      
      const rect = sliderRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      
      parallaxLayers.current.forEach((layer, index) => {
        const factor = (index + 1) * 15;
        if (layer) {
          layer.style.transform = `translate3d(${x * factor}px, ${y * factor}px, 0)`;
        }
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [sliderRef]);

  return (
    <>
      {/* Layer 1 - Far background geometric shapes */}
      <div 
        ref={el => {
          if (el) parallaxLayers.current[0] = el;
        }}
        className="absolute inset-0 transition-transform duration-300 ease-out"
        style={{ zIndex: 1 }}
      >
        <motion.div 
          className="absolute top-[20%] left-[20%] w-40 h-40 bg-limbus-300/20 rounded-full"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-[30%] right-[10%] w-32 h-32 bg-purple-400/10 rounded-full"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div 
          className="absolute top-[60%] left-[10%] w-24 h-24 bg-blue-300/15 rounded-full"
          animate={{ 
            scale: [1, 1.15, 1],
            opacity: [0.15, 0.25, 0.15]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>
      
      {/* Layer 2 - Middle geometric elements */}
      <div 
        ref={el => {
          if (el) parallaxLayers.current[1] = el;
        }}
        className="absolute inset-0 transition-transform duration-300 ease-out"
        style={{ zIndex: 2 }}
      >
        <motion.div 
          className="absolute top-[15%] right-[25%] w-48 h-32 bg-gradient-to-br from-limbus-500/10 to-purple-600/10 rounded-3xl"
          animate={{ 
            rotate: [0, 5, 0, -5, 0],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-[20%] left-[30%] w-36 h-36 bg-gradient-to-tr from-blue-500/10 to-purple-400/10 rounded-full"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.15, 0.25, 0.15]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
        <motion.div 
          className="absolute top-[40%] left-[15%] w-32 h-32 border-2 border-limbus-400/20 rounded-full"
          animate={{ 
            rotate: [0, 180, 360],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
      </div>
      
      {/* Layer 3 - Foreground geometric elements */}
      <div 
        ref={el => {
          if (el) parallaxLayers.current[2] = el;
        }}
        className="absolute inset-0 transition-transform duration-300 ease-out"
        style={{ zIndex: 3 }}
      >
        <motion.div 
          className="absolute top-[35%] right-[15%] w-20 h-20 bg-limbus-400/20 rotate-45"
          animate={{ 
            rotate: [45, 90, 45],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-[25%] left-[25%] w-16 h-16 bg-purple-500/20 rounded-lg"
          animate={{ 
            rotate: [0, 180, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute bottom-[15%] right-[30%] w-24 h-24 border-2 border-blue-400/30 rounded-full"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        />
        
        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 3 + Math.random() * 5,
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
