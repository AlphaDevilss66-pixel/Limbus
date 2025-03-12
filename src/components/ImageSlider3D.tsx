
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ParallaxLayers } from './slider/ParallaxLayers';

interface ImageSlider3DProps {
  image?: string;
}

export const ImageSlider3D = ({ image }: ImageSlider3DProps) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      className="relative overflow-hidden h-[500px] w-full perspective rounded-3xl shadow-2xl bg-black"
      ref={sliderRef}
    >
      {/* Dark background gradient with longer animation timing */}
      <motion.div 
        className="absolute inset-0 rounded-3xl opacity-90"
        animate={{ 
          background: [
            'radial-gradient(circle at 30% 30%, rgba(79, 70, 229, 0.7) 0%, rgba(20, 17, 60, 0.95) 70%)',
            'radial-gradient(circle at 70% 70%, rgba(124, 58, 237, 0.7) 0%, rgba(35, 15, 70, 0.95) 70%)',
            'radial-gradient(circle at 30% 70%, rgba(56, 189, 248, 0.7) 0%, rgba(18, 60, 80, 0.95) 70%)',
            'radial-gradient(circle at 70% 30%, rgba(79, 70, 229, 0.7) 0%, rgba(20, 17, 60, 0.95) 70%)'
          ] 
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />

      {/* Parallax layers with extended visibility */}
      <ParallaxLayers sliderRef={sliderRef} />

      {/* Main content */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="relative w-full max-w-5xl mx-auto h-[90%] rounded-2xl overflow-hidden">
          {/* Darker geometric background */}
          <div className="absolute inset-0 w-full h-full">
            <div className="w-full h-full bg-gradient-to-br from-slate-900 to-purple-900/90 rounded-2xl"></div>
          </div>
          
          {/* Content overlay with increased contrast */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-black/60 backdrop-blur-sm">
            <motion.h2 
              className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
              animate={{ 
                textShadow: [
                  "0 0 8px rgba(139, 92, 246, 0.9)",
                  "0 0 16px rgba(139, 92, 246, 1)",
                  "0 0 8px rgba(139, 92, 246, 0.9)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              Limbus Experience
            </motion.h2>
            
            <motion.p 
              className="text-xl text-white/90 max-w-2xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Un viaggio nel limbo digitale dove i pensieri si librano nell'aria come sussurri
            </motion.p>
            
            <motion.button
              className="mt-8 px-8 py-3 bg-gradient-to-r from-purple-700 to-blue-700 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Esplora
            </motion.button>
          </div>
          
          {/* Enhanced decorative elements */}
          <motion.div 
            className="absolute top-10 right-10 w-16 h-16 rounded-full bg-purple-600/70 backdrop-blur-sm"
            animate={{ 
              y: [0, -10, 0],
              opacity: [0.6, 0.9, 0.6]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute bottom-20 left-10 w-12 h-12 rounded-full bg-blue-600/70 backdrop-blur-sm"
            animate={{ 
              y: [0, 10, 0],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        </div>
      </div>
    </div>
  );
};
