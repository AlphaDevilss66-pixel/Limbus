
import { motion } from 'framer-motion';

interface NavigationButtonsProps {
  onPrev: () => void;
  onNext: () => void;
}

export const NavigationButtons = ({ onPrev, onNext }: NavigationButtonsProps) => {
  return (
    <>
      <motion.button 
        onClick={onPrev} 
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
        onClick={onNext} 
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
    </>
  );
};
