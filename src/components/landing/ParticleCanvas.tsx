
import { motion } from "framer-motion";

export const ParticleCanvas = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width: Math.random() * 2 + 1,
            height: Math.random() * 2 + 1,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.3 + 0.05,
          }}
          animate={{
            y: [0, -Math.random() * 100 - 50],
            x: [0, (Math.random() - 0.5) * 30],
            opacity: [0.05, 0.2, 0],
            scale: [0, 1, 0.5],
          }}
          transition={{
            duration: Math.random() * 20 + 15,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
};
