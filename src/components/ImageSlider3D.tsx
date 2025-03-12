
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
      className="relative overflow-hidden h-[500px] w-full rounded-3xl shadow-2xl bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900 via-purple-900 to-slate-900"
      ref={sliderRef}
    >
      {/* Dynamic background gradient */}
      <motion.div 
        className="absolute inset-0 rounded-3xl opacity-90"
        animate={{ 
          background: [
            'radial-gradient(circle at 30% 30%, rgba(124, 58, 237, 0.8) 0%, rgba(35, 15, 70, 0.95) 70%)',
            'radial-gradient(circle at 70% 70%, rgba(168, 85, 247, 0.8) 0%, rgba(45, 15, 80, 0.95) 70%)',
            'radial-gradient(circle at 30% 70%, rgba(56, 189, 248, 0.8) 0%, rgba(18, 60, 80, 0.95) 70%)',
            'radial-gradient(circle at 70% 30%, rgba(139, 92, 246, 0.8) 0%, rgba(30, 17, 80, 0.95) 70%)'
          ] 
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      {/* Decorative elements */}
      <div className="absolute inset-0 z-[1]">
        {/* Large colorful shapes */}
        <motion.div 
          className="absolute top-[15%] left-[20%] w-64 h-64 rounded-full bg-gradient-to-br from-purple-600/40 to-blue-600/40 blur-[15px]"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-[20%] right-[10%] w-72 h-72 rounded-full bg-gradient-to-tr from-violet-600/40 to-fuchsia-600/40 blur-[15px]"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div 
          className="absolute top-[40%] right-[25%] w-48 h-48 rounded-full bg-gradient-to-tr from-cyan-600/40 to-blue-600/40 blur-[15px]"
          animate={{ 
            scale: [1, 1.15, 1],
            opacity: [0.4, 0.6, 0.4]
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Enhanced floating particles */}
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/70 blur-[0.5px]"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * -50],
              x: [0, Math.random() * 30 - 15],
              opacity: [0.4, 0.9, 0.4],
              scale: [0.8, 1.6, 0.8]
            }}
            transition={{
              duration: 4 + Math.random() * 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 3
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
            whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)" }}
            className="bg-white/10 backdrop-blur-md p-8 rounded-2xl text-center transition-all duration-300 border border-purple-500/20 hover:border-purple-500/30 shadow-lg"
          >
            <motion.div 
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.8 }}
              className="bg-indigo-900/50 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6 shadow-inner border border-indigo-500/30"
            >
              <MessageCircle className="h-8 w-8 text-indigo-300" />
            </motion.div>
            <h3 className="text-xl font-semibold text-white mb-4">Condividi un Sussurro</h3>
            <p className="text-indigo-200">
              Scrivi i tuoi pensieri, scegli un'emozione e un tema, e lascia che il tuo messaggio si libri nel limbo.
            </p>
          </motion.div>
          
          {/* Card 2 - Risuona con gli Altri */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)" }}
            className="bg-white/10 backdrop-blur-md p-8 rounded-2xl text-center transition-all duration-300 border border-pink-500/20 hover:border-pink-500/30 shadow-lg"
          >
            <motion.div 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-purple-900/50 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6 shadow-inner border border-purple-500/30"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  color: ["#d8b4fe", "#f0abfc", "#d8b4fe"]
                }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <Heart className="h-8 w-8 text-pink-300" />
              </motion.div>
            </motion.div>
            <h3 className="text-xl font-semibold text-white mb-4">Risuona con gli Altri</h3>
            <p className="text-purple-200">
              Leggi i sussurri degli altri e lascia una risonanza quando un messaggio tocca le tue corde emotive.
            </p>
          </motion.div>
          
          {/* Card 3 - Visualizzazioni Uniche */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)" }}
            className="bg-white/10 backdrop-blur-md p-8 rounded-2xl text-center transition-all duration-300 border border-blue-500/20 hover:border-blue-500/30 shadow-lg"
          >
            <motion.div 
              whileHover={{ rotateY: 180 }}
              transition={{ duration: 0.8 }}
              className="bg-blue-900/50 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6 shadow-inner border border-blue-500/30"
            >
              <motion.div
                animate={{ 
                  rotate: [0, 15, -15, 0],
                }}
                transition={{ repeat: Infinity, duration: 3 }}
              >
                <Star className="h-8 w-8 text-blue-300" />
              </motion.div>
            </motion.div>
            <h3 className="text-xl font-semibold text-white mb-4">Visualizzazioni Uniche</h3>
            <p className="text-blue-200">
              Scegli come visualizzare i sussurri: come foglie che ondeggiano, gocce che cadono o nebbia che avvolge.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
