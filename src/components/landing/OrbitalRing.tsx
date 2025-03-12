
import { motion } from "framer-motion";

interface OrbitalRingProps {
  delay?: number;
  duration?: number;
  size?: number;
  opacity?: number;
  color?: string;
}

export const OrbitalRing = ({ 
  delay = 0, 
  duration = 60, 
  size = 300, 
  opacity = 0.1, 
  color = "purple" 
}: OrbitalRingProps) => {
  return (
    <motion.div
      className="absolute rounded-full border-2 border-dashed pointer-events-none"
      style={{
        width: size,
        height: size,
        borderColor: `${color}-400`,
        opacity,
        top: "50%",
        left: "50%",
        x: "-50%",
        y: "-50%",
      }}
      animate={{ rotate: 360 }}
      transition={{ duration, repeat: Infinity, ease: "linear", delay }}
    />
  );
};
