
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

  // Auto-rotate the slider
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    
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

  // Variants for the 3D animations
  const sliderVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      rotateY: direction > 0 ? 45 : -45,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      rotateY: 0,
      opacity: 1,
      scale: 1,
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
      scale: 0.8,
      transition: {
        duration: 0.5
      }
    })
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
      className="relative overflow-hidden h-[400px] w-full perspective"
      ref={sliderRef}
      onMouseDown={handleDragStart}
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onTouchStart={handleDragStart}
      onTouchMove={handleDragMove}
      onTouchEnd={handleDragEnd}
    >
      {/* Main image */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={sliderVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 flex items-center justify-center"
          style={{ perspective: 1000 }}
        >
          <div className="relative w-full max-w-2xl mx-auto rounded-2xl overflow-hidden glass-card shadow-glow-intense transform-style">
            <img 
              src={current} 
              alt="slider image" 
              className="w-full h-auto object-cover rounded-2xl"
            />
            <div className="absolute inset-0 glass rounded-2xl flex items-center justify-center">
              <div className="text-2xl font-bold text-white text-shadow">
                Limbus Experience
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Side preview images */}
      <div className="absolute top-1/2 -translate-y-1/2 -left-10 z-10 transform -translate-x-1/2 opacity-50 scale-75">
        <img 
          src={prev} 
          alt="previous" 
          className="w-40 h-40 object-cover rounded-xl shadow-md transform -rotate-6"
        />
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 -right-10 z-10 transform translate-x-1/2 opacity-50 scale-75">
        <img 
          src={next} 
          alt="next" 
          className="w-40 h-40 object-cover rounded-xl shadow-md transform rotate-6"
        />
      </div>

      {/* Navigation buttons */}
      <button 
        onClick={prevSlide} 
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/40 transition-all"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button 
        onClick={nextSlide} 
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/40 transition-all"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex 
                ? "bg-white scale-125" 
                : "bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
