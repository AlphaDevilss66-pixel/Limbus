
import { useRef, useState } from 'react';
import { CosmicBackground } from './CosmicBackground';
import { SliderCard } from './SliderCard';
import { NavigationDots } from './NavigationDots';
import { SliderHeading } from './SliderHeading';
import { motion } from 'framer-motion';

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
      icon: "MessageCircle",
      color: "bg-purple-400/30",
      hoverColor: "hover:bg-purple-400/40",
    },
    {
      title: "Risuona con gli Altri",
      description: "Leggi i sussurri degli altri e lascia una risonanza quando un messaggio tocca le tue corde emotive.",
      icon: "Heart",
      color: "bg-pink-400/30",
      hoverColor: "hover:bg-pink-400/40",
    },
    {
      title: "Visualizzazioni Uniche",
      description: "Scegli come visualizzare i sussurri: come foglie che ondeggiano, gocce che cadono o nebbia che avvolge.",
      icon: "Star",
      color: "bg-blue-400/30",
      hoverColor: "hover:bg-blue-400/40",
    },
    {
      title: "Emozioni Stellari",
      description: "Esprimi i tuoi sentimenti attraverso emozioni che risplendono come costellazioni nel cielo digitale.",
      icon: "Sparkles",
      color: "bg-amber-400/30",
      hoverColor: "hover:bg-amber-400/40",
    },
    {
      title: "Temi Cosmici",
      description: "Scegli tra diversi temi per caratterizzare i tuoi sussurri e renderli unici nell'universo digitale.",
      icon: "Feather",
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
      <CosmicBackground />

      {/* Main content */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="w-full max-w-6xl mx-auto px-6">
          <SliderHeading />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {cards.map((card, index) => (
              <SliderCard 
                key={index}
                card={card}
                index={index}
                isActive={activeCard === index}
                onHoverStart={() => setActiveCard(index)}
                onHoverEnd={() => setActiveCard(-1)}
              />
            ))}
          </div>
          
          {/* Navigation dots */}
          <NavigationDots 
            count={cards.length}
            activeIndex={activeCard}
            onDotClick={setActiveCard}
          />
        </div>
      </div>
    </div>
  );
};
