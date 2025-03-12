
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { IntroAnimation } from "@/components/IntroAnimation";
import { ArrowRight, BookLock, Clock, History, Sparkles, Send } from "lucide-react";
import { useState, useEffect } from "react";
import { ImageSlider3D } from "@/components/ImageSlider3D";

const Landing = () => {
  const [introCompleted, setIntroCompleted] = useState(false);
  const [showContent, setShowContent] = useState(false);

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

  const features = [
    {
      icon: <Sparkles className="h-6 w-6 text-white" />,
      title: "Sussurri dell'anima",
      description: "Condividi i tuoi pensieri più profondi in modo anonimo, lasciando una traccia della tua essenza nel mondo.",
      color: "from-purple-500 to-indigo-600"
    },
    {
      icon: <BookLock className="h-6 w-6 text-white" />,
      title: "Biblioteca Invisibile",
      description: "Accedi a pensieri segreti e profondi, visibili solo a chi ha condiviso qualcosa di sé.",
      color: "from-indigo-600 to-blue-700"
    },
    {
      icon: <Send className="h-6 w-6 text-white" />,
      title: "Messaggio al Destino",
      description: "Affida i tuoi pensieri al futuro, lasciando che appaiano in momenti inaspettati e a persone sconosciute.",
      color: "from-blue-600 to-indigo-700"
    },
    {
      icon: <Clock className="h-6 w-6 text-white" />,
      title: "Scrigno del Tempo",
      description: "Crea messaggi per il futuro, che verranno svelati solo dopo un periodo di tempo che sceglierai tu.",
      color: "from-violet-600 to-purple-700"
    },
    {
      icon: <History className="h-6 w-6 text-white" />,
      title: "Voci dal Passato",
      description: "Riscopri pensieri dimenticati che tornano alla luce per risuonare con nuove anime.",
      color: "from-amber-600 to-orange-700"
    }
  ];

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
          {/* Background gradient radials */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-purple-600/10 blur-3xl"></div>
            <div className="absolute top-1/3 -left-20 w-80 h-80 rounded-full bg-indigo-600/10 blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-60 h-60 rounded-full bg-blue-600/10 blur-3xl"></div>
          </div>

          {/* Cosmic subtle particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  width: Math.random() * 3 + 1,
                  height: Math.random() * 3 + 1,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0.1, 0.5, 0.1],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: Math.random() * 5 + 3,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                }}
              />
            ))}
          </div>

          {/* Main content */}
          <div className="container mx-auto px-4 relative z-10">
            {/* Hero section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="flex flex-col items-center justify-center min-h-screen text-center py-20"
            >
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
              >
                <span className="bg-gradient-to-r from-white via-purple-200 to-indigo-200 text-transparent bg-clip-text">
                  Sussurri
                </span>
                <br />
                <span className="bg-gradient-to-r from-indigo-300 via-purple-200 to-white text-transparent bg-clip-text">
                  nell'Etere
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="text-xl text-indigo-100 max-w-2xl mb-10"
              >
                Un luogo dove i pensieri, come sussurri, vagano liberi nell'etere in attesa di risuonare con anime affini.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.1, duration: 0.5 }}
              >
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-full py-6 px-8 text-lg shadow-[0_0_20px_rgba(139,92,246,0.5)]"
                >
                  <Link to="/auth">
                    Inizia il viaggio <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4, duration: 1 }}
                className="mt-32 mb-16"
              >
                <div className="w-8 h-8 mx-auto border-b-2 border-r-2 border-white/60 transform rotate-45 animate-bounce"></div>
              </motion.div>
            </motion.section>

            {/* Features section */}
            <section className="py-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
                  Esperienze Uniche
                </h2>
                <div className="w-20 h-1 mx-auto bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mb-6"></div>
                <p className="text-indigo-100 max-w-2xl mx-auto">
                  Scopri tutte le modalità per esprimere i tuoi pensieri e connetterti con il mondo in modo significativo.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 * index, duration: 0.5 }}
                    className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(139,92,246,0.2)] transition-all hover:-translate-y-1"
                  >
                    <div className={`bg-gradient-to-r ${feature.color} p-3 rounded-xl inline-flex mb-4`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                    <p className="text-indigo-100">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Interactive section with 3D effect */}
            <section className="py-20">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="max-w-7xl mx-auto relative perspective"
              >
                <ImageSlider3D />
              </motion.div>
            </section>

            {/* Footer/Call to action */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-20 text-center"
            >
              <div className="max-w-3xl mx-auto backdrop-blur-md bg-indigo-500/10 rounded-3xl p-12 border border-indigo-300/10 shadow-[0_0_30px_rgba(99,102,241,0.2)]">
                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
                  Pronto a iniziare il tuo viaggio?
                </h2>
                <p className="text-indigo-100 mb-10">
                  Unisciti alla comunità di anime che sussurrano i loro pensieri più profondi e scoprono connessioni inaspettate.
                </p>
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-full px-8 py-6 text-lg shadow-[0_0_15px_rgba(139,92,246,0.3)]"
                >
                  <Link to="/auth">
                    Crea il tuo primo sussurro <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </motion.section>

            <footer className="py-10 text-center text-indigo-200/60 text-sm">
              <p>© {new Date().getFullYear()} Sussurri nell'Etere • Un'esperienza immersiva di condivisione</p>
            </footer>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Landing;
