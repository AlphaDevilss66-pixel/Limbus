
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { IntroAnimation } from "@/components/IntroAnimation";
import { BookLock, Clock, History, Sparkles, Send } from "lucide-react";

// Import refactored components
import { ParticleCanvas } from "@/components/landing/ParticleCanvas";
import { BackgroundEffects } from "@/components/landing/BackgroundEffects";
import { HeroSection } from "@/components/landing/HeroSection";
import { DemoWhisperSection } from "@/components/landing/DemoWhisperSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { FooterSection } from "@/components/landing/FooterSection";

const Landing = () => {
  const [introCompleted, setIntroCompleted] = useState(false);
  const [showContent, setShowContent] = useState(false);

  // Features data
  const features = [
    {
      icon: <Sparkles className="h-8 w-8 text-white" />,
      title: "Sussurri dell'anima",
      description: "Condividi i tuoi pensieri più profondi in modo anonimo, lasciando una traccia della tua essenza nel mondo.",
      color: "from-purple-500 to-indigo-600",
      bgColor: "bg-gradient-to-br from-purple-500/20 to-indigo-600/20"
    },
    {
      icon: <BookLock className="h-8 w-8 text-white" />,
      title: "Biblioteca Invisibile",
      description: "Accedi a pensieri segreti e profondi, visibili solo a chi ha condiviso qualcosa di sé.",
      color: "from-indigo-600 to-blue-700",
      bgColor: "bg-gradient-to-br from-indigo-600/20 to-blue-700/20"
    },
    {
      icon: <Send className="h-8 w-8 text-white" />,
      title: "Messaggio al Destino",
      description: "Affida i tuoi pensieri al futuro, lasciando che appaiano in momenti inaspettati e a persone sconosciute.",
      color: "from-blue-600 to-indigo-700",
      bgColor: "bg-gradient-to-br from-blue-600/20 to-indigo-700/20"
    },
    {
      icon: <Clock className="h-8 w-8 text-white" />,
      title: "Scrigno del Tempo",
      description: "Crea messaggi per il futuro, che verranno svelati solo dopo un periodo di tempo che sceglierai tu.",
      color: "from-violet-600 to-purple-700",
      bgColor: "bg-gradient-to-br from-violet-600/20 to-purple-700/20"
    },
    {
      icon: <History className="h-8 w-8 text-white" />,
      title: "Voci dal Passato",
      description: "Riscopri pensieri dimenticati che tornano alla luce per risuonare con nuove anime.",
      color: "from-amber-600 to-orange-700",
      bgColor: "bg-gradient-to-br from-amber-600/20 to-orange-700/20"
    }
  ];

  useEffect(() => {
    // Check if intro has been shown before
    const hasSeenIntro = localStorage.getItem("hasSeenIntro");
    if (hasSeenIntro) {
      setIntroCompleted(true);
      setShowContent(true);
    }
  }, []);

  const handleIntroComplete = () => {
    setIntroCompleted(true);
    localStorage.setItem("hasSeenIntro", "true");
    setTimeout(() => {
      setShowContent(true);
    }, 500);
  };

  return (
    <div className="min-h-screen relative text-white overflow-hidden">
      {!introCompleted ? (
        <IntroAnimation onComplete={handleIntroComplete} />
      ) : !showContent ? (
        <div className="flex justify-center items-center h-screen">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-10 h-10 border-t-2 border-b-2 border-white rounded-full animate-spin"
          ></motion.div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative"
        >
          {/* Background animated effects */}
          <BackgroundEffects />
          <ParticleCanvas />

          {/* Main content */}
          <div className="container mx-auto px-4 relative z-10">
            {/* Hero section */}
            <HeroSection features={features} />

            {/* Demo whisper input */}
            <DemoWhisperSection />

            {/* Features section */}
            <FeaturesSection features={features} />

            {/* Footer/Call to action */}
            <FooterSection />
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Landing;
