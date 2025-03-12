
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageSlider3DProps {
  images: string[];
}

export const ImageSlider3D = ({ images }: ImageSlider3DProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const parallaxLayers = useRef<HTMLDivElement[]>([]);

  // Auto-rotate the slider
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentIndex]);

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sliderRef.current) return;
      
      const rect = sliderRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      
      parallaxLayers.current.forEach((layer, index) => {
        const factor = (index + 1) * 20;
        if (layer) {
          layer.style.transform = `translate3d(${x * factor}px, ${y * factor}px, 0) rotateX(${y * 10}deg) rotateY(${-x * 10}deg)`;
        }
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleDragStart = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    isDragging.current = true;
    if ('clientX' in e) {
      startX.current = e.clientX;
    } else {
      startX.current = e.touches[0].clientX;
    }
  };

  const handleDragMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;

    let currentX: number;
    if ('clientX' in e) {
      currentX = e.clientX;
    } else {
      currentX = e.touches[0].clientX;
    }

    const diffX = currentX - startX.current;

    if (diffX > 50) {
      prevSlide();
      isDragging.current = false;
    } else if (diffX < -50) {
      nextSlide();
      isDragging.current = false;
    }
  };

  const handleDragEnd = () => {
    isDragging.current = false;
  };

  // Enhanced 3D variants for the slider
  const sliderVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      rotateY: direction > 0 ? 45 : -45,
      opacity: 0,
      scale: 0.7,
      z: -500,
    }),
    center: {
      x: 0,
      rotateY: 0,
      opacity: 1,
      scale: 1,
      z: 0,
      transition: {
        duration: 0.8,
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      rotateY: direction < 0 ? 45 : -45,
      opacity: 0,
      scale: 0.7,
      z: -500,
      transition: {
        duration: 0.5
      }
    })
  };

  // Create parallax effect with multiple layers
  const createParallaxLayers = () => {
    return Array.from({ length: 3 }).map((_, index) => (
      <div 
        key={`layer-${index}`}
        ref={el => {
          if (el) parallaxLayers.current[index] = el;
        }}
        className="absolute inset-0 transition-transform duration-300 ease-out"
        style={{ zIndex: 3 - index }}
      >
        <div 
          className={`absolute ${index === 0 ? 'w-7/8 h-7/8' : index === 1 ? 'w-3/4 h-3/4' : 'w-1/2 h-1/2'} left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${index === 0 ? 'bg-gradient-to-r from-purple-500/10 to-blue-500/10' : index === 1 ? 'bg-gradient-to-br from-indigo-500/5 to-transparent' : 'bg-white/5'} rounded-full blur-xl`}
        ></div>
      </div>
    ));
  };

  // Determine which images to show (current, prev, next)
  const getDisplayImages = () => {
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    const nextIndex = (currentIndex + 1) % images.length;
    
    return {
      prev: images[prevIndex],
      current: images[currentIndex],
      next: images[nextIndex]
    };
  };

  const { prev, current, next } = getDisplayImages();

  return (
    <div 
      className="relative overflow-hidden h-[500px] w-full perspective"
      ref={sliderRef}
      onMouseDown={handleDragStart}
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onTouchStart={handleDragStart}
      onTouchMove={handleDragMove}
      onTouchEnd={handleDragEnd}
    >
      {/* Parallax Layers */}
      {createParallaxLayers()}

      {/* Glowing background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-purple-900/30 via-indigo-900/20 to-blue-900/30 rounded-3xl"
        animate={{ 
          background: [
            'radial-gradient(circle at 30% 30%, rgba(79, 70, 229, 0.2) 0%, transparent 70%)',
            'radial-gradient(circle at 70% 70%, rgba(124, 58, 237, 0.2) 0%, transparent 70%)',
            'radial-gradient(circle at 30% 70%, rgba(56, 189, 248, 0.2) 0%, transparent 70%)',
            'radial-gradient(circle at 70% 30%, rgba(79, 70, 229, 0.2) 0%, transparent 70%)'
          ] 
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      {/* Main image */}
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={sliderVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 flex items-center justify-center"
          style={{ perspective: 1500, transformStyle: "preserve-3d" }}
        >
          <div className="relative w-full max-w-4xl mx-auto h-4/5 rounded-2xl overflow-hidden transform-style">
            <img 
              src={current} 
              alt="slider image" 
              className="w-full h-full object-cover rounded-2xl shadow-glow-intense"
            />
            <div className="absolute inset-0 backdrop-blur-sm bg-gradient-to-b from-transparent via-purple-900/20 to-purple-900/40 rounded-2xl flex items-center justify-center">
              <motion.div 
                className="text-3xl font-bold text-white text-shadow"
                animate={{ 
                  textShadow: [
                    "0 0 8px rgba(139, 92, 246, 0.7)",
                    "0 0 16px rgba(139, 92, 246, 0.9)",
                    "0 0 8px rgba(139, 92, 246, 0.7)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                Limbus Experience
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Side preview images with floating animation */}
      <motion.div 
        className="absolute top-1/2 -translate-y-1/2 -left-5 z-10 transform -translate-x-1/2 opacity-50 scale-75"
        animate={{ 
          x: [-20, -15, -20],
          y: [-50, -55, -50],
          rotate: [-5, -3, -5]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ perspective: 1000, transformStyle: "preserve-3d" }}
      >
        <img 
          src={prev} 
          alt="previous" 
          className="w-40 h-40 object-cover rounded-xl shadow-glow"
        />
      </motion.div>
      
      <motion.div 
        className="absolute top-1/2 -translate-y-1/2 -right-5 z-10 transform translate-x-1/2 opacity-50 scale-75"
        animate={{ 
          x: [20, 15, 20],
          y: [-50, -55, -50],
          rotate: [5, 3, 5]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        style={{ perspective: 1000, transformStyle: "preserve-3d" }}
      >
        <img 
          src={next} 
          alt="next" 
          className="w-40 h-40 object-cover rounded-xl shadow-glow"
        />
      </motion.div>

      {/* Floating mini-images for decoration */}
      {Array.from({ length: 4 }).map((_, i) => (
        <motion.div
          key={`float-${i}`}
          className="absolute z-0 opacity-30"
          style={{
            top: `${20 + Math.random() * 60}%`,
            left: `${20 + Math.random() * 60}%`,
            width: `${30 + Math.random() * 20}px`,
            height: `${30 + Math.random() * 20}px`,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, i % 2 ? 10 : -10, 0],
            rotate: [0, 360, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.8
          }}
        >
          <img
            src={images[Math.floor(Math.random() * images.length)]}
            alt="floating"
            className="w-full h-full object-cover rounded-lg shadow-glow"
          />
        </motion.div>
      ))}

      {/* Navigation buttons */}
      <motion.button 
        onClick={prevSlide} 
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-purple-800/30 backdrop-blur-md border border-purple-500/30 hover:bg-purple-700/40 transition-all shadow-glow"
        whileHover={{ 
          scale: 1.1, 
          backgroundColor: "rgba(168, 85, 247, 0.4)",
          boxShadow: "0 0 20px rgba(168, 85, 247, 0.6)" 
        }}
        whileTap={{ scale: 0.95 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </motion.button>
      
      <motion.button 
        onClick={nextSlide} 
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-purple-800/30 backdrop-blur-md border border-purple-500/30 hover:bg-purple-700/40 transition-all shadow-glow"
        whileHover={{ 
          scale: 1.1, 
          backgroundColor: "rgba(168, 85, 247, 0.4)",
          boxShadow: "0 0 20px rgba(168, 85, 247, 0.6)" 
        }}
        whileTap={{ scale: 0.95 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </motion.button>

      {/* Dots indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {images.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex 
                ? "bg-purple-400 shadow-glow-purple" 
                : "bg-purple-400/40 hover:bg-purple-400/80"
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            animate={index === currentIndex ? {
              scale: [1, 1.2, 1],
              boxShadow: [
                "0 0 0px rgba(168, 85, 247, 0.7)",
                "0 0 10px rgba(168, 85, 247, 0.9)",
                "0 0 0px rgba(168, 85, 247, 0.7)"
              ]
            } : {}}
            transition={{ duration: 1.5, repeat: index === currentIndex ? Infinity : 0, ease: "easeInOut" }}
          />
        ))}
      </div>
    </div>
  );
};
