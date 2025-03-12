
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
        // Increased factor for more pronounced parallax effect
        const factor = (index + 1) * 25;
        if (layer) {
          // Using more responsive and smoother transitions
          layer.style.transition = "transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
          layer.style.transform = `translate3d(${x * factor}px, ${y * factor}px, 0)`;
        }
      });
    };
    
    // Adding this event to make the parallax effect persist even as you scroll the page
    const handleScroll = () => {
      if (!sliderRef.current) return;
      
      const rect = sliderRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Only apply effect if slider is in viewport
      if (rect.top < viewportHeight && rect.bottom > 0) {
        const scrollProgress = (viewportHeight - rect.top) / (viewportHeight + rect.height);
        const clampedProgress = Math.max(0, Math.min(1, scrollProgress));
        
        parallaxLayers.current.forEach((layer, index) => {
          if (layer) {
            // Making sure the parallax effect stays visible longer during scroll
            const intensity = 1 - Math.pow(Math.abs(clampedProgress - 0.5) * 2, 2);
            layer.style.opacity = `${Math.max(0.2, intensity)}`;
          }
        });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sliderRef]);

  return (
    <>
      {/* Layer 1 - Far background geometric shapes */}
      <div 
        ref={el => {
          if (el) parallaxLayers.current[0] = el;
        }}
        className="absolute inset-0 transition-transform duration-700 ease-out"
        style={{ zIndex: 1 }}
      >
        <motion.div 
          className="absolute top-[20%] left-[20%] w-60 h-60 bg-purple-600/40 rounded-full blur-md"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.6, 0.4]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-[30%] right-[10%] w-48 h-48 bg-blue-500/40 rounded-full blur-md"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>
      
      {/* Layer 2 - Middle geometric elements */}
      <div 
        ref={el => {
          if (el) parallaxLayers.current[1] = el;
        }}
        className="absolute inset-0 transition-transform duration-700 ease-out"
        style={{ zIndex: 2 }}
      >
        <motion.div 
          className="absolute top-[10%] right-[25%] w-64 h-64 bg-gradient-to-br from-purple-700/50 to-blue-600/50 rounded-3xl blur-[3px]"
          animate={{ 
            rotate: [0, 180, 360],
            scale: [0.9, 1.1, 0.9]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute bottom-[15%] left-[30%] w-48 h-48 bg-gradient-to-tr from-violet-600/50 to-fuchsia-600/50 rounded-full blur-[3px]"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
        
        {/* Additional shapes for more visual interest */}
        <motion.div 
          className="absolute top-[50%] left-[15%] w-32 h-32 bg-gradient-to-tr from-cyan-600/50 to-blue-500/50 rounded-lg rotate-45 blur-[2px]"
          animate={{ 
            rotate: [45, 90, 45],
            scale: [1, 1.15, 1],
            opacity: [0.4, 0.6, 0.4]
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      
      {/* Layer 3 - Foreground geometric elements */}
      <div 
        ref={el => {
          if (el) parallaxLayers.current[2] = el;
        }}
        className="absolute inset-0 transition-transform duration-700 ease-out"
        style={{ zIndex: 3 }}
      >
        <motion.div 
          className="absolute top-[35%] right-[15%] w-36 h-36 bg-indigo-600/60 rotate-45 blur-[1px]"
          animate={{ 
            rotate: [45, 225, 45],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-[25%] left-[25%] w-28 h-28 bg-fuchsia-600/60 rounded-lg blur-[1px]"
          animate={{ 
            rotate: [0, 180, 360],
            scale: [1, 1.3, 1]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Enhanced floating particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-white/70 rounded-full blur-[0.5px]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -25, 0],
              x: [0, Math.random() * 30 - 15, 0],
              opacity: [0.4, 0.9, 0.4],
              scale: [0.8, 1.6, 0.8]
            }}
            transition={{
              duration: 4 + Math.random() * 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 3
            }}
          />
        ))}
      </div>
    </>
  );
};
