
import { motion } from 'framer-motion';

interface FloatingImagesProps {
  images: string[];
}

export const FloatingImages = ({ images }: FloatingImagesProps) => {
  return Array.from({ length: 4 }).map((_, i) => (
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
  ));
};
