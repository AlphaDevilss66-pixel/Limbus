
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Heart, Star } from 'lucide-react';

interface ImageSlider3DProps {
  image?: string;
}

export const ImageSlider3D = ({ image }: ImageSlider3DProps) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      className="relative overflow-hidden h-[500px] w-full rounded-3xl shadow-lg bg-gradient-to-b from-blue-100/80 to-blue-200/60"
      ref={sliderRef}
    >
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-300/10 via-purple-200/10 to-blue-100/10"></div>
      
      {/* Subtle particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.4 + 0.1,
            }}
            animate={{
              y: [0, Math.random() * -30],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mx-auto px-6">
          {/* Card 1 - Condividi un Sussurro */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/20 backdrop-blur-md p-8 rounded-2xl text-center transition-all duration-300 border border-white/30"
          >
            <div className="bg-purple-400/30 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6 backdrop-blur-sm">
              <MessageCircle className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">Condividi un Sussurro</h3>
            <p className="text-white/90">
              Scrivi i tuoi pensieri, scegli un'emozione e un tema, e lascia che il tuo messaggio si libri nel limbo.
            </p>
          </motion.div>
          
          {/* Card 2 - Risuona con gli Altri */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/20 backdrop-blur-md p-8 rounded-2xl text-center transition-all duration-300 border border-white/30"
          >
            <div className="bg-pink-400/30 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6 backdrop-blur-sm">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">Risuona con gli Altri</h3>
            <p className="text-white/90">
              Leggi i sussurri degli altri e lascia una risonanza quando un messaggio tocca le tue corde emotive.
            </p>
          </motion.div>
          
          {/* Card 3 - Visualizzazioni Uniche */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white/20 backdrop-blur-md p-8 rounded-2xl text-center transition-all duration-300 border border-white/30"
          >
            <div className="bg-blue-400/30 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6 backdrop-blur-sm">
              <Star className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">Visualizzazioni Uniche</h3>
            <p className="text-white/90">
              Scegli come visualizzare i sussurri: come foglie che ondeggiano, gocce che cadono o nebbia che avvolge.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
