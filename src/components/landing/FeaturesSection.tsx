
import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface FeaturesSectionProps {
  features: Array<{
    icon: React.ReactNode;
    title: string;
    description: string;
    color: string;
    bgColor: string;
  }>;
}

export const FeaturesSection = ({ features }: FeaturesSectionProps) => {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  return (
    <section className="py-20 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white/95 to-white/75">
          Esperienze Uniche
        </h2>
        <motion.div 
          className="w-20 h-0.5 mx-auto bg-white/30 rounded-full mb-6"
          animate={{ width: ['5rem', '7rem', '5rem'] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <p className="text-white/80 max-w-2xl mx-auto">
          Scopri tutte le modalità per esprimere i tuoi pensieri e connetterti con il mondo in modo significativo.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 * index, duration: 0.5 }}
            whileHover={{ 
              scale: 1.03,
              y: -5
            }}
            onHoverStart={() => setHoveredFeature(index)}
            onHoverEnd={() => setHoveredFeature(null)}
            className={cn(
              "rounded-2xl p-8 transition-all duration-500 relative overflow-hidden",
              "backdrop-blur-xl bg-white/5 border border-white/10",
              hoveredFeature === index ? "border-white/20 shadow-[0_8px_30px_rgba(255,255,255,0.06)]" : "border-white/5"
            )}
          >
            {/* Dynamic background gradient animation on hover */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-30"
              animate={{ 
                opacity: hoveredFeature === index ? 0.4 : 0.1,
                scale: hoveredFeature === index ? 1.1 : 1
              }}
              transition={{ duration: 0.5 }}
            />
            
            {/* Content */}
            <div className="relative z-10">
              <motion.div 
                className="backdrop-blur-xl bg-white/5 border border-white/10 p-4 rounded-xl inline-flex mb-6"
                whileHover={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 0.7 }}
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-2xl font-bold mb-4 text-white/90">{feature.title}</h3>
              <p className="text-white/70">{feature.description}</p>
            </div>
            
            {/* Particle effects on hover */}
            {hoveredFeature === index && (
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full bg-white"
                    style={{
                      width: Math.random() * 3 + 1,
                      height: Math.random() * 3 + 1,
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: [0, 0.4, 0],
                      scale: [0, 1, 0],
                      y: [0, -Math.random() * 20 - 10]
                    }}
                    transition={{ 
                      duration: Math.random() * 2 + 1,
                      repeat: Infinity,
                      delay: Math.random()
                    }}
                  />
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};
