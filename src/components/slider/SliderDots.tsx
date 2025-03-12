
import { motion } from 'framer-motion';

interface SliderDotsProps {
  images: string[];
  currentIndex: number;
  onDotClick: (index: number) => void;
}

export const SliderDots = ({ images, currentIndex, onDotClick }: SliderDotsProps) => {
  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
      {images.map((_, index) => (
        <motion.button
          key={index}
          onClick={() => onDotClick(index)}
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
  );
};
