
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
        const factor = (index + 1) * 15;
        if (layer) {
          layer.style.transform = `translate3d(${x * factor}px, ${y * factor}px, 0)`;
        }
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [sliderRef]);

  return (
    <>
      {/* Background layer */}
      <div 
        ref={el => {
          if (el) parallaxLayers.current[0] = el;
        }}
        className="absolute inset-0 transition-transform duration-300 ease-out"
        style={{ zIndex: 1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-indigo-900/30 to-blue-900/40 rounded-3xl"></div>
      </div>
      
      {/* Middle layer */}
      <div 
        ref={el => {
          if (el) parallaxLayers.current[1] = el;
        }}
        className="absolute inset-0 transition-transform duration-300 ease-out"
        style={{ zIndex: 2 }}
      >
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <div className="absolute w-3/4 h-3/4 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full blur-xl"></div>
        </div>
      </div>
      
      {/* Foreground layer */}
      <div 
        ref={el => {
          if (el) parallaxLayers.current[2] = el;
        }}
        className="absolute inset-0 transition-transform duration-300 ease-out"
        style={{ zIndex: 3 }}
      >
        <div className="absolute top-[20%] left-[10%] w-1/3 h-1/3 bg-blue-300/10 backdrop-blur-sm rounded-full"></div>
        <div className="absolute bottom-[20%] right-[10%] w-1/4 h-1/4 bg-purple-300/10 backdrop-blur-sm rounded-full"></div>
      </div>
    </>
  );
};
