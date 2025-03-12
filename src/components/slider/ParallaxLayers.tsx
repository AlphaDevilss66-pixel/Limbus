
import { useRef, useEffect } from 'react';

interface ParallaxLayersProps {
  sliderRef: React.RefObject<HTMLDivElement>;
}

export const ParallaxLayers = ({ sliderRef }: ParallaxLayersProps) => {
  const parallaxLayers = useRef<HTMLDivElement[]>([]);

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sliderRef.current) return;
      
      const rect = sliderRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      
      parallaxLayers.current.forEach((layer, index) => {
        const factor = (index + 1) * 20;
        if (layer) {
          layer.style.transform = `translate3d(${x * factor}px, ${y * factor}px, 0) rotateX(${y * 10}deg) rotateY(${-x * 10}deg)`;
        }
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [sliderRef]);

  return Array.from({ length: 3 }).map((_, index) => (
    <div 
      key={`layer-${index}`}
      ref={el => {
        if (el) parallaxLayers.current[index] = el;
      }}
      className="absolute inset-0 transition-transform duration-300 ease-out"
      style={{ zIndex: 3 - index }}
    >
      <div 
        className={`absolute ${index === 0 ? 'w-7/8 h-7/8' : index === 1 ? 'w-3/4 h-3/4' : 'w-1/2 h-1/2'} left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${index === 0 ? 'bg-gradient-to-r from-purple-500/10 to-blue-500/10' : index === 1 ? 'bg-gradient-to-br from-indigo-500/5 to-transparent' : 'bg-white/5'} rounded-full blur-xl`}
      ></div>
    </div>
  ));
};
