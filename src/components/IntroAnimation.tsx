
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

interface IntroAnimationProps {
  onComplete: () => void;
}

export const IntroAnimation = ({ onComplete }: IntroAnimationProps) => {
  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-limbus-900 via-purple-800 to-blue-900"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 3 }}
      onAnimationComplete={onComplete}
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: [0, 1.2, 1],
            opacity: [0, 1, 1]
          }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex justify-center mb-6"
        >
          <motion.div
            animate={{ 
              rotate: [0, 360],
              boxShadow: [
                "0 0 10px rgba(255,255,255,0.2)",
                "0 0 20px rgba(255,255,255,0.5)",
                "0 0 30px rgba(255,255,255,0.7)",
                "0 0 10px rgba(255,255,255,0.2)"
              ]
            }}
            transition={{ duration: 2, times: [0, 0.5, 0.8, 1] }}
            className="rounded-full bg-white/10 backdrop-blur-md p-4"
          >
            <MessageCircle className="h-16 w-16 text-white" />
          </motion.div>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.7 }}
          className="text-4xl font-bold text-white mb-2"
        >
          Limbus
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.7 }}
          className="text-limbus-100"
        >
          Pensieri nel limbo digitale
        </motion.p>
        
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 2, duration: 1 }}
          className="h-0.5 bg-gradient-to-r from-transparent via-white to-transparent mt-4 max-w-xs mx-auto"
        />
      </div>
      
      {/* Particle effects */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0
            }}
            animate={{ 
              opacity: [0, 0.7, 0],
              scale: [0, 1, 0],
            }}
            transition={{ 
              duration: Math.random() * 2 + 1,
              delay: Math.random() * 2,
              repeat: 1,
              repeatDelay: Math.random()
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};
