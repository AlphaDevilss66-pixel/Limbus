
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Heart, Star, Sparkles, Wind, Feather } from 'lucide-react';

interface ImageSlider3DProps {
  image?: string;
}

export const ImageSlider3D = ({ image }: ImageSlider3DProps) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState<number>(1);

  const cards = [
    {
      title: "Condividi un Sussurro",
      description: "Scrivi i tuoi pensieri, scegli un'emozione e un tema, e lascia che il tuo messaggio si libri nel limbo.",
      icon: <MessageCircle className="h-8 w-8 text-white" />,
      color: "bg-purple-400/30",
      hoverColor: "hover:bg-purple-400/40",
    },
    {
      title: "Risuona con gli Altri",
      description: "Leggi i sussurri degli altri e lascia una risonanza quando un messaggio tocca le tue corde emotive.",
      icon: <Heart className="h-8 w-8 text-white" />,
      color: "bg-pink-400/30",
      hoverColor: "hover:bg-pink-400/40",
    },
    {
      title: "Visualizzazioni Uniche",
      description: "Scegli come visualizzare i sussurri: come foglie che ondeggiano, gocce che cadono o nebbia che avvolge.",
      icon: <Star className="h-8 w-8 text-white" />,
      color: "bg-blue-400/30",
      hoverColor: "hover:bg-blue-400/40",
    },
    {
      title: "Emozioni Stellari",
      description: "Esprimi i tuoi sentimenti attraverso emozioni che risplendono come costellazioni nel cielo digitale.",
      icon: <Sparkles className="h-8 w-8 text-white" />,
      color: "bg-amber-400/30",
      hoverColor: "hover:bg-amber-400/40",
    },
    {
      title: "Temi Cosmici",
      description: "Scegli tra diversi temi per caratterizzare i tuoi sussurri e renderli unici nell'universo digitale.",
      icon: <Feather className="h-8 w-8 text-white" />,
      color: "bg-teal-400/30",
      hoverColor: "hover:bg-teal-400/40",
    },
  ];

  return (
    <div 
      className="relative overflow-hidden h-[600px] w-full rounded-3xl shadow-lg bg-gradient-to-b from-blue-900/60 to-purple-900/60 backdrop-blur-lg border border-indigo-500/20"
      ref={sliderRef}
    >
      {/* Cosmic background effect */}
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

      {/* Main content */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="w-full max-w-6xl mx-auto px-6">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent"
            animate={{ 
              textShadow: ["0 0 10px rgba(255,255,255,0.3)", "0 0 20px rgba(255,255,255,0.5)", "0 0 10px rgba(255,255,255,0.3)"]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            Un'esperienza immersiva
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {cards.map((card, index) => (
              <motion.div 
                key={index}
                initial={{ y: 50, opacity: 0 }}
                animate={{ 
                  y: 0, 
                  opacity: 1,
                  z: activeCard === index ? 50 : 0,
                  scale: activeCard === index ? 1.05 : 1,
                }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  type: activeCard === index ? "spring" : "tween",
                  stiffness: 300,
                  damping: 15,
                }}
                whileHover={{ 
                  scale: 1.05, 
                  z: 50,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
                }}
                onHoverStart={() => setActiveCard(index)}
                onHoverEnd={() => setActiveCard(-1)}
                className={`bg-white/10 backdrop-blur-md p-8 rounded-2xl text-center transition-all duration-300 border border-white/20 transform perspective-1000 hover:rotate-[0.5deg] ${activeCard === index ? 'shadow-glow-intense z-20' : 'shadow-md'}`}
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
                      rotateY: activeCard === index ? [0, 360] : 0
                    }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                  >
                    {card.icon}
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
                
                {activeCard === index && (
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
            ))}
          </div>
          
          {/* Navigation dots */}
          <div className="flex justify-center mt-12 space-x-2">
            {cards.map((_, index) => (
              <motion.button
                key={index}
                className={`w-3 h-3 rounded-full ${activeCard === index ? 'bg-white' : 'bg-white/30'} transition-colors duration-300`}
                whileHover={{ scale: 1.3 }}
                onClick={() => setActiveCard(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
