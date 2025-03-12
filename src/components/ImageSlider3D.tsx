
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ParallaxLayers } from './slider/ParallaxLayers';
import { NavigationButtons } from './slider/NavigationButtons';
import { SliderDots } from './slider/SliderDots';
import { FloatingImages } from './slider/FloatingImages';

interface ImageSlider3DProps {
  images: string[];
}

export const ImageSlider3D = ({ images }: ImageSlider3DProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);

  // Auto-rotate the slider
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentIndex]);

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

  const { prev, current, next } = {
    prev: images[(currentIndex - 1 + images.length) % images.length],
    current: images[currentIndex],
    next: images[(currentIndex + 1) % images.length]
  };

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

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
      <ParallaxLayers sliderRef={sliderRef} />

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

      <NavigationButtons onPrev={prevSlide} onNext={nextSlide} />
      <SliderDots images={images} currentIndex={currentIndex} onDotClick={handleDotClick} />
      <FloatingImages images={images} />
    </div>
  );
};
