
import { motion } from 'framer-motion';

interface NavigationDotsProps {
  count: number;
  activeIndex: number;
  onDotClick: (index: number) => void;
}

export const NavigationDots = ({ count, activeIndex, onDotClick }: NavigationDotsProps) => {
  return (
    <div className="flex justify-center mt-12 space-x-2">
      {[...Array(count)].map((_, index) => (
        <motion.button
          key={index}
          className={`w-3 h-3 rounded-full ${activeIndex === index ? 'bg-white' : 'bg-white/30'} transition-colors duration-300`}
          whileHover={{ scale: 1.3 }}
          onClick={() => onDotClick(index)}
        />
      ))}
    </div>
  );
};
