
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { OrbitalRing } from "./OrbitalRing";

interface FeatureIconProps {
  icon: React.ReactNode;
  color: string;
  index: number;
}

const FeatureIcon = ({ icon, color, index }: FeatureIconProps) => {
  return (
    <motion.div
      key={index}
      className="absolute"
      initial={{ rotate: index * 72 }}
      animate={{ rotate: index * 72 + 360 }}
      transition={{ duration: 60 + index * 10, repeat: Infinity, ease: "linear" }}
    >
      <motion.div
        className={`absolute bg-gradient-to-br ${color} p-3 rounded-full shadow-glow`}
        style={{
          left: `calc(50% + ${180}px)`,
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
        whileHover={{ scale: 1.2 }}
      >
        {icon}
      </motion.div>
    </motion.div>
  );
};

interface HeroSectionProps {
  features: Array<{
    icon: React.ReactNode;
    title: string;
    description: string;
    color: string;
    bgColor: string;
  }>;
}

export const HeroSection = ({ features }: HeroSectionProps) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.8 }}
      className="flex flex-col items-center justify-center min-h-screen text-center py-20 relative"
    >
      {/* Orbiting circles */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <OrbitalRing size={300} duration={60} opacity={0.2} color="indigo" />
        <OrbitalRing size={500} duration={90} delay={5} opacity={0.1} color="purple" />
        <OrbitalRing size={700} duration={120} delay={10} opacity={0.05} color="blue" />
        
        {/* Orbiting planets/icons */}
        {[0, 1, 2, 3, 4].map((i) => (
          <FeatureIcon 
            key={i}
            icon={features[i].icon} 
            color={features[i].color} 
            index={i} 
          />
        ))}
      </div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-6xl md:text-8xl font-bold mb-8 leading-tight relative"
      >
        <motion.span 
          className="block bg-gradient-to-r from-white via-purple-200 to-indigo-200 text-transparent bg-clip-text"
          animate={{ 
            textShadow: ["0 0 10px rgba(255,255,255,0.3)", "0 0 20px rgba(255,255,255,0.5)", "0 0 10px rgba(255,255,255,0.3)"]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          Sussurri
        </motion.span>
        <motion.span 
          className="block bg-gradient-to-r from-indigo-300 via-purple-200 to-white text-transparent bg-clip-text mt-2"
          animate={{ 
            textShadow: ["0 0 10px rgba(255,255,255,0.3)", "0 0 20px rgba(255,255,255,0.5)", "0 0 10px rgba(255,255,255,0.3)"]
          }}
          transition={{ duration: 3, delay: 0.5, repeat: Infinity, ease: "easeInOut" }}
        >
          nell'Infinito
        </motion.span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="text-xl text-indigo-100 max-w-2xl mb-12"
      >
        Un luogo dove i pensieri, come sussurri, vagano liberi nell'infinito 
        in attesa di connettersi con persone affini.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.1, duration: 0.5 }}
        className="relative z-10"
      >
        <Button
          asChild
          size="lg"
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-full py-7 px-10 text-lg shadow-[0_0_25px_rgba(139,92,246,0.5)] relative overflow-hidden group"
        >
          <Link to="/auth" className="flex items-center gap-2">
            <span className="relative z-10">Inizia il viaggio</span>
            <motion.span
              className="relative z-10"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowRight className="ml-1 h-5 w-5" />
            </motion.span>
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-purple-600/50 to-indigo-600/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              animate={{ 
                background: [
                  "linear-gradient(90deg, rgba(124, 58, 237, 0.5) 0%, rgba(99, 102, 241, 0.5) 100%)",
                  "linear-gradient(90deg, rgba(139, 92, 246, 0.5) 0%, rgba(79, 70, 229, 0.5) 100%)",
                  "linear-gradient(90deg, rgba(124, 58, 237, 0.5) 0%, rgba(99, 102, 241, 0.5) 100%)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </Link>
        </Button>

        {/* Light beam under button */}
        <motion.div 
          className="absolute bottom-0 left-1/2 w-1 h-40 bg-gradient-to-b from-purple-500 to-transparent -z-10 opacity-50"
          style={{ translateX: "-50%" }}
          animate={{ height: [40, 60, 40], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="mt-36 mb-20"
      >
        <motion.div 
          className="w-10 h-10 mx-auto border-b-2 border-r-2 border-white/60 transform rotate-45"
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.section>
  );
};

