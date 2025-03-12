
import { motion } from 'framer-motion';
import { MessageCircle, Heart, Star, Sparkles, Feather } from 'lucide-react';

interface SliderCardProps {
  card: {
    title: string;
    description: string;
    icon: string;
    color: string;
    hoverColor: string;
  };
  index: number;
  isActive: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}

export const SliderCard = ({ 
  card, 
  index, 
  isActive, 
  onHoverStart, 
  onHoverEnd 
}: SliderCardProps) => {
  
  // Map string icon names to actual components
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'MessageCircle': return <MessageCircle className="h-8 w-8 text-white" />;
      case 'Heart': return <Heart className="h-8 w-8 text-white" />;
      case 'Star': return <Star className="h-8 w-8 text-white" />;
      case 'Sparkles': return <Sparkles className="h-8 w-8 text-white" />;
      case 'Feather': return <Feather className="h-8 w-8 text-white" />;
      default: return <MessageCircle className="h-8 w-8 text-white" />;
    }
  };

  return (
    <motion.div 
      initial={{ y: 50, opacity: 0 }}
      animate={{ 
        y: 0, 
        opacity: 1,
        z: isActive ? 50 : 0,
        scale: isActive ? 1.05 : 1,
      }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        type: isActive ? "spring" : "tween",
        stiffness: 300,
        damping: 15,
      }}
      whileHover={{ 
        scale: 1.05, 
        z: 50,
        boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
      }}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      className={`bg-white/10 backdrop-blur-md p-8 rounded-2xl text-center transition-all duration-300 border border-white/20 transform perspective-1000 hover:rotate-[0.5deg] ${isActive ? 'shadow-glow-intense z-20' : 'shadow-md'}`}
      style={{ 
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div 
        className={`${card.color} ${card.hoverColor} w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-8 backdrop-blur-sm shadow-glow transition-all duration-300`}
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.8 }}
        style={{ transformStyle: "preserve-3d", transform: "translateZ(20px)" }}
      >
        <motion.div
          animate={{ 
            rotateY: isActive ? [0, 360] : 0
          }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          {getIcon(card.icon)}
        </motion.div>
      </motion.div>
      
      <motion.h3 
        className="text-2xl font-semibold text-white mb-4"
        style={{ transformStyle: "preserve-3d", transform: "translateZ(15px)" }}
      >
        {card.title}
      </motion.h3>
      
      <motion.p 
        className="text-white/90"
        style={{ transformStyle: "preserve-3d", transform: "translateZ(10px)" }}
      >
        {card.description}
      </motion.p>
      
      {isActive && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          className="absolute inset-0 pointer-events-none"
        >
          {/* Particle effects when card is active */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-white"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 0.8, 0],
                scale: [0, 1, 0],
                y: [0, -Math.random() * 30],
              }}
              transition={{
                duration: 1 + Math.random(),
                repeat: Infinity,
                repeatDelay: Math.random() * 2,
              }}
            />
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};
