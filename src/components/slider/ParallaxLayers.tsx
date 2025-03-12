
import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ParallaxLayersProps {
  sliderRef: React.RefObject<HTMLDivElement>;
}

export const ParallaxLayers = ({ sliderRef }: ParallaxLayersProps) => {
  const parallaxLayers = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sliderRef.current) return;
      
      const rect = sliderRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      
      parallaxLayers.current.forEach((layer, index) => {
        const factor = (index + 1) * 20;
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
          className="absolute top-[20%] left-[20%] w-40 h-40 bg-purple-600/30 rounded-full blur-sm"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-[30%] right-[10%] w-32 h-32 bg-blue-500/30 rounded-full blur-sm"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
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
          className="absolute top-[15%] right-[25%] w-48 h-48 bg-gradient-to-br from-purple-700/40 to-blue-600/40 rounded-3xl blur-[2px]"
          animate={{ 
            rotate: [0, 180, 360],
            scale: [0.9, 1.1, 0.9]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute bottom-[20%] left-[30%] w-36 h-36 bg-gradient-to-tr from-violet-600/40 to-fuchsia-600/40 rounded-full blur-[2px]"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
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
          className="absolute top-[35%] right-[15%] w-24 h-24 bg-indigo-600/50 rotate-45 blur-[1px]"
          animate={{ 
            rotate: [45, 225, 45],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-[25%] left-[25%] w-20 h-20 bg-fuchsia-600/50 rounded-lg blur-[1px]"
          animate={{ 
            rotate: [0, 180, 360],
            scale: [1, 1.3, 1]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Enhanced floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/60 rounded-full blur-[0.5px]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [0.8, 1.4, 0.8]
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

