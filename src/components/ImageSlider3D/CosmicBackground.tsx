
import { motion } from 'framer-motion';

export const CosmicBackground = () => {
  return (
    <div className="absolute inset-0">
      {/* Radial gradients */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-indigo-600/10 blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[200px] h-[200px] rounded-full bg-purple-600/10 blur-3xl"></div>
      
      {/* Star field effect */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2 + 1,
              height: Math.random() * 2 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.7 + 0.3,
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
      
      {/* Moving nebula effect */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-blue-800/5 via-purple-600/5 to-indigo-800/5"
        animate={{ 
          background: [
            "linear-gradient(135deg, rgba(30, 64, 175, 0.05) 0%, rgba(147, 51, 234, 0.05) 50%, rgba(79, 70, 229, 0.05) 100%)",
            "linear-gradient(135deg, rgba(79, 70, 229, 0.05) 0%, rgba(30, 64, 175, 0.05) 50%, rgba(147, 51, 234, 0.05) 100%)",
            "linear-gradient(135deg, rgba(147, 51, 234, 0.05) 0%, rgba(79, 70, 229, 0.05) 50%, rgba(30, 64, 175, 0.05) 100%)",
          ]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      {/* Flowing particles */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i + "flow"}
            className="absolute rounded-full bg-white/40 blur-sm"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.05 + 0.02,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0.02, 0.05, 0.02],
            }}
            transition={{
              duration: Math.random() * 40 + 20,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 10,
            }}
          />
        ))}
      </div>
    </div>
  );
};
