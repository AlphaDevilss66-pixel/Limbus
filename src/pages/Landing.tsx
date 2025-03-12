
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { IntroAnimation } from "@/components/IntroAnimation";
import { ArrowRight, BookLock, Clock, History, Sparkles, Send, Star, Heart, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { ImageSlider3D } from "@/components/ImageSlider3D";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const Landing = () => {
  const [introCompleted, setIntroCompleted] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [demoWhisper, setDemoWhisper] = useState("");
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

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

  const ParticleCanvas = () => {
    return (
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.1,
            }}
            animate={{
              y: [0, -Math.random() * 100 - 50],
              x: [0, (Math.random() - 0.5) * 50],
              opacity: [0.1, 0.5, 0],
              scale: [0, 1, 0.5],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
    );
  };

  const OrbitalRing = ({ delay = 0, duration = 60, size = 300, opacity = 0.1, color = "purple" }) => {
    return (
      <motion.div
        className="absolute rounded-full border-2 border-dashed pointer-events-none"
        style={{
          width: size,
          height: size,
          borderColor: `${color}-400`,
          opacity,
          top: "50%",
          left: "50%",
          x: "-50%",
          y: "-50%",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration, repeat: Infinity, ease: "linear", delay }}
      />
    );
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
          {/* Background animated radial gradients */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            <motion.div 
              className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-3xl"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{ 
                duration: 10, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            />
            <motion.div 
              className="absolute top-1/3 -left-40 w-[400px] h-[400px] rounded-full bg-indigo-600/10 blur-3xl"
              animate={{ 
                scale: [1.2, 1, 1.2],
                opacity: [0.3, 0.1, 0.3]
              }}
              transition={{ 
                duration: 15, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            />
            <motion.div 
              className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full bg-blue-600/10 blur-3xl"
              animate={{ 
                scale: [1, 1.4, 1],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            />
          </div>

          <ParticleCanvas />

          {/* Main content */}
          <div className="container mx-auto px-4 relative z-10">
            {/* Hero section */}
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
                  <motion.div
                    key={i}
                    className="absolute"
                    initial={{ rotate: i * 72 }}
                    animate={{ rotate: i * 72 + 360 }}
                    transition={{ duration: 60 + i * 10, repeat: Infinity, ease: "linear" }}
                  >
                    <motion.div
                      className={`absolute bg-gradient-to-br ${features[i].color} p-3 rounded-full shadow-glow`}
                      style={{
                        left: `calc(50% + ${180}px)`,
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                      }}
                      whileHover={{ scale: 1.2 }}
                    >
                      {features[i].icon}
                    </motion.div>
                  </motion.div>
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
                  nell'Etere
                </motion.span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="text-xl text-indigo-100 max-w-2xl mb-12"
              >
                Un luogo dove i pensieri, come sussurri, vagano liberi nell'etere 
                in attesa di risuonare con anime affini.
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

            {/* Demo whisper input */}
            <motion.section
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="py-20 relative"
            >
              <div className="max-w-2xl mx-auto">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="text-center mb-12"
                >
                  <motion.h2 
                    className="text-4xl font-bold mb-6 bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent"
                    animate={{ 
                      backgroundPosition: ['0% center', '100% center', '0% center'],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  >
                    Prova l'esperienza
                  </motion.h2>
                  <p className="text-indigo-100 max-w-xl mx-auto">
                    Scrivi un pensiero, un'emozione, un ricordo - qualsiasi cosa tu voglia sussurrare all'universo
                  </p>
                </motion.div>

                <div className="relative bg-purple-900/30 backdrop-blur-xl p-6 rounded-2xl border border-purple-500/30 shadow-glow overflow-hidden">
                  {/* Animated particle effects inside the card */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(10)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute rounded-full bg-white/10"
                        style={{
                          width: Math.random() * 5 + 2,
                          height: Math.random() * 5 + 2,
                          top: `${Math.random() * 100}%`,
                          left: `${Math.random() * 100}%`,
                        }}
                        animate={{
                          y: [0, -20],
                          opacity: [0, 0.5, 0],
                        }}
                        transition={{
                          duration: Math.random() * 3 + 2,
                          repeat: Infinity,
                          delay: Math.random() * 5,
                        }}
                      />
                    ))}
                  </div>

                  <div className="relative z-10">
                    <Textarea
                      value={demoWhisper}
                      onChange={(e) => setDemoWhisper(e.target.value)}
                      placeholder="Scrivi il tuo sussurro qui..."
                      className="h-32 mb-4 text-white placeholder:text-purple-400/70 focus:border-purple-400/50 relative"
                    />
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-3">
                        <motion.button 
                          className="text-purple-300 hover:text-purple-200 transition"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Heart className="h-5 w-5" />
                        </motion.button>
                        <motion.button 
                          className="text-purple-300 hover:text-purple-200 transition"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Star className="h-5 w-5" />
                        </motion.button>
                        <motion.button 
                          className="text-purple-300 hover:text-purple-200 transition"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <MessageCircle className="h-5 w-5" />
                        </motion.button>
                      </div>
                      <motion.button
                        className="bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-2 rounded-lg text-white shadow-glow-intense"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setDemoWhisper("")}
                      >
                        Sussurra
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Features section */}
            <section className="py-20 relative">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
                  Esperienze Uniche
                </h2>
                <motion.div 
                  className="w-20 h-1 mx-auto bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mb-6"
                  animate={{ width: ['5rem', '7rem', '5rem'] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                <p className="text-indigo-100 max-w-2xl mx-auto">
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
                      scale: 1.05,
                      boxShadow: "0 10px 30px rgba(139, 92, 246, 0.3)",
                      y: -5
                    }}
                    onHoverStart={() => setHoveredFeature(index)}
                    onHoverEnd={() => setHoveredFeature(null)}
                    className={cn(
                      "rounded-2xl p-8 shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-500 relative overflow-hidden",
                      feature.bgColor,
                      "backdrop-blur-md border border-white/10",
                      hoveredFeature === index ? "border-white/30" : "border-white/5"
                    )}
                  >
                    {/* Dynamic background gradient animation on hover */}
                    <motion.div 
                      className={cn(
                        "absolute inset-0 bg-gradient-to-br opacity-30",
                        feature.color
                      )}
                      animate={{ 
                        opacity: hoveredFeature === index ? 0.5 : 0.2,
                        scale: hoveredFeature === index ? 1.1 : 1
                      }}
                      transition={{ duration: 0.5 }}
                    />
                    
                    {/* Content */}
                    <div className="relative z-10">
                      <motion.div 
                        className={`bg-gradient-to-r ${feature.color} p-4 rounded-xl inline-flex mb-6 shadow-glow`}
                        whileHover={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 0.7 }}
                      >
                        {feature.icon}
                      </motion.div>
                      <h3 className="text-2xl font-bold mb-4 text-white">{feature.title}</h3>
                      <p className="text-indigo-100">{feature.description}</p>
                    </div>
                    
                    {/* Particle effects on hover */}
                    {hoveredFeature === index && (
                      <div className="absolute inset-0 pointer-events-none">
                        {[...Array(10)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute rounded-full bg-white"
                            style={{
                              width: Math.random() * 4 + 1,
                              height: Math.random() * 4 + 1,
                              top: `${Math.random() * 100}%`,
                              left: `${Math.random() * 100}%`,
                            }}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ 
                              opacity: [0, 0.7, 0],
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

            {/* Interactive section with 3D effect */}
            <motion.section 
              className="py-20"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <div className="max-w-7xl mx-auto relative perspective">
                <ImageSlider3D />
              </div>
            </motion.section>

            {/* Footer/Call to action */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="py-20 text-center"
            >
              <motion.div 
                className="max-w-3xl mx-auto backdrop-blur-md bg-indigo-500/10 rounded-3xl p-12 border border-indigo-300/10"
                animate={{ boxShadow: ["0 0 30px rgba(99, 102, 241, 0.1)", "0 0 50px rgba(99, 102, 241, 0.3)", "0 0 30px rgba(99, 102, 241, 0.1)"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
                    Pronto a iniziare il tuo viaggio?
                  </h2>
                  <p className="text-indigo-100 mb-10">
                    Unisciti alla comunità di anime che sussurrano i loro pensieri più profondi e scoprono connessioni inaspettate.
                  </p>
                  <Button
                    asChild
                    size="lg"
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-full px-8 py-7 text-lg shadow-[0_0_15px_rgba(139,92,246,0.3)] relative overflow-hidden group"
                  >
                    <Link to="/auth" className="flex items-center">
                      <span className="relative z-10">Crea il tuo primo sussurro</span> 
                      <motion.span
                        className="relative z-10 ml-2"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <ArrowRight className="h-5 w-5" />
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
                </motion.div>
              </motion.div>

              <motion.footer 
                className="py-10 text-center text-indigo-200/60 text-sm mt-20"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <p>© {new Date().getFullYear()} Sussurri nell'Etere • Un'esperienza immersiva di condivisione</p>
              </motion.footer>
            </motion.section>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Landing;
