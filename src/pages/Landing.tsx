
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Leaf, Droplet, CloudFog, MessageCircle, Heart, Send, LogIn, LogOut, User, Star, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { IntroAnimation } from "@/components/IntroAnimation";

const Landing = () => {
  const { user, signOut } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const featuresRef = useRef(null);
  const visualsRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    
    // Hide intro animation after 3.5 seconds
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 3500);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen overflow-hidden relative">
      {/* Intro Animation */}
      <AnimatePresence>
        {showIntro && <IntroAnimation onComplete={() => setShowIntro(false)} />}
      </AnimatePresence>

      {/* Animated Background */}
      <div className="fixed inset-0 w-full h-full -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-limbus-900/10 via-purple-500/5 to-blue-500/10 animate-gradient-shift"></div>
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <div 
              key={i}
              className="particle absolute rounded-full bg-white/20 backdrop-blur-sm"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 100 + 50}px`,
                height: `${Math.random() * 100 + 50}px`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${Math.random() * 30 + 20}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Header */}
      <header className={`fixed w-full transition-all duration-500 z-50 ${
        scrolled ? "bg-white/80 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
      }`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: showIntro ? 3.5 : 0, duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <MessageCircle className="h-6 w-6 text-limbus-600" />
            </motion.div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-limbus-600 to-limbus-800 bg-clip-text text-transparent">
              Limbus
            </h1>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: showIntro ? 3.8 : 0, duration: 0.5 }}
            className="flex items-center gap-4"
          >
            <motion.div 
              whileHover={{ y: -3 }}
              className="cursor-pointer text-limbus-600 hover:text-limbus-800 hidden md:flex"
              onClick={() => scrollToSection(featuresRef)}
            >
              Caratteristiche
            </motion.div>
            <motion.div 
              whileHover={{ y: -3 }}
              className="cursor-pointer text-limbus-600 hover:text-limbus-800 hidden md:flex"
              onClick={() => scrollToSection(visualsRef)}
            >
              Visualizzazioni
            </motion.div>
            {user ? (
              <>
                <Button asChild variant="ghost" className="flex items-center gap-2 hover:bg-limbus-100 hover:text-limbus-700">
                  <Link to="/whispers">
                    <MessageCircle className="h-4 w-4" />
                    <span>I miei sussurri</span>
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => signOut()} 
                  className="flex items-center gap-2 border-limbus-200 hover:bg-limbus-100 hover:text-limbus-700"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Esci</span>
                </Button>
              </>
            ) : (
              <Button 
                asChild 
                variant="default" 
                size="sm" 
                className="flex items-center gap-2 bg-gradient-to-r from-limbus-500 to-limbus-700 hover:from-limbus-600 hover:to-limbus-800 transition-all duration-300"
              >
                <Link to="/auth">
                  <LogIn className="h-4 w-4" />
                  <span>Accedi</span>
                </Link>
              </Button>
            )}
          </motion.div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative">
        <div className="absolute inset-0 bg-[url('/light-pattern.svg')] opacity-5" />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: showIntro ? 4 : 0.2, duration: 0.8 }}
          className="container mx-auto relative"
        >
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: showIntro ? 4.2 : 0.4, duration: 0.5 }}
              className="mb-6 inline-block"
            >
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-limbus-100 to-limbus-200 text-limbus-800"
              >
                <motion.div
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                  <Sparkles className="h-4 w-4 text-limbus-600" />
                </motion.div>
                <span className="text-sm font-medium">Scopri il potere dei sussurri</span>
              </motion.div>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: showIntro ? 4.4 : 0.6, duration: 0.8 }}
              className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
            >
              <span className="text-transparent bg-gradient-to-r from-limbus-800 via-limbus-700 to-limbus-600 bg-clip-text animate-text-gradient-shift">
                Condividi i tuoi pensieri nel limbo digitale
              </span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: showIntro ? 4.6 : 0.8, duration: 0.8 }}
              className="text-xl text-gray-600 mb-10 leading-relaxed"
            >
              Limbus è uno spazio dove i pensieri si librano nell'aria come sussurri, 
              senza peso e senza giudizio. Un luogo dove condividere emozioni, 
              riflessioni e storie in totale anonimato.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: showIntro ? 4.8 : 1, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  asChild 
                  size="lg" 
                  className="rounded-full px-8 shadow-lg hover:shadow-xl transition-all bg-gradient-to-r from-limbus-500 to-limbus-700 hover:from-limbus-600 hover:to-limbus-800"
                >
                  <Link to="/whispers">
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                      className="mr-2"
                    >
                      <Send className="h-5 w-5" />
                    </motion.div>
                    Inizia a sussurrare
                  </Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  asChild 
                  variant="outline" 
                  size="lg" 
                  className="rounded-full px-8 border-2 border-limbus-200 hover:bg-limbus-50 hover:border-limbus-300 transition-all duration-300"
                >
                  <Link to="/auth">
                    <User className="mr-2 h-5 w-5" />
                    Crea un account
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: '-100%', x: `${Math.random() * 100}%`, opacity: 0.3 }}
              animate={{ 
                y: '200%', 
                x: `${Math.random() * 100}%`,
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: Math.random() * 20 + 15, 
                repeat: Infinity, 
                ease: "linear",
                delay: Math.random() * 10
              }}
              className="absolute w-8 h-8 rounded-full bg-limbus-300/20 backdrop-blur-sm"
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-20 px-4 bg-gradient-to-b from-limbus-50/50 to-purple-50/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        <div className="container mx-auto relative">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center bg-gradient-to-r from-limbus-800 to-limbus-600 bg-clip-text text-transparent mb-16"
          >
            Come funziona Limbus
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -10,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              className="glass p-8 rounded-2xl text-center transition-all duration-300"
            >
              <motion.div 
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.8 }}
                className="bg-gradient-to-br from-limbus-100 to-limbus-200 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6 shadow-inner"
              >
                <MessageCircle className="h-8 w-8 text-limbus-600" />
              </motion.div>
              <h3 className="text-xl font-semibold text-limbus-900 mb-4">Condividi un Sussurro</h3>
              <p className="text-gray-600">
                Scrivi i tuoi pensieri, scegli un'emozione e un tema, e lascia che il tuo messaggio si libri nel limbo.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -10,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              className="glass p-8 rounded-2xl text-center transition-all duration-300"
            >
              <motion.div 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-gradient-to-br from-limbus-100 to-limbus-200 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6 shadow-inner"
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    color: ["#4f55bf", "#a855f7", "#4f55bf"]
                  }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <Heart className="h-8 w-8 text-limbus-600" />
                </motion.div>
              </motion.div>
              <h3 className="text-xl font-semibold text-limbus-900 mb-4">Risuona con gli Altri</h3>
              <p className="text-gray-600">
                Leggi i sussurri degli altri e lascia una risonanza quando un messaggio tocca le tue corde emotive.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -10,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              className="glass p-8 rounded-2xl text-center transition-all duration-300"
            >
              <motion.div 
                whileHover={{ rotateY: 180 }}
                transition={{ duration: 0.8 }}
                className="bg-gradient-to-br from-limbus-100 to-limbus-200 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6 shadow-inner"
              >
                <motion.div
                  animate={{ 
                    rotate: [0, 15, -15, 0],
                  }}
                  transition={{ repeat: Infinity, duration: 3 }}
                >
                  <Star className="h-8 w-8 text-limbus-600" />
                </motion.div>
              </motion.div>
              <h3 className="text-xl font-semibold text-limbus-900 mb-4">Visualizzazioni Uniche</h3>
              <p className="text-gray-600">
                Scegli come visualizzare i sussurri: come foglie che ondeggiano, gocce che cadono o nebbia che avvolge.
              </p>
            </motion.div>
          </div>
        </div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                x: `${Math.random() * 100}%`, 
                y: `${Math.random() * 100}%`,
                opacity: 0.1,
                scale: Math.random() * 0.5 + 0.5
              }}
              animate={{ 
                x: `${Math.random() * 100}%`,
                y: `${Math.random() * 100}%`,
                rotate: [0, 180, 360],
                opacity: [0.1, 0.3, 0.1]
              }}
              transition={{ 
                duration: Math.random() * 20 + 20, 
                repeat: Infinity, 
                ease: "linear"
              }}
              className="absolute w-32 h-32 rounded-full bg-gradient-to-r from-limbus-200/20 to-purple-200/20 backdrop-blur-sm"
            />
          ))}
        </div>
      </section>

      {/* Visual Modes Section */}
      <section ref={visualsRef} className="py-20 px-4 relative overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-limbus-50/30">
        <div className="absolute inset-0 bg-[url('/dots-pattern.svg')] opacity-5" />
        <div className="container mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-limbus-900 mb-4">Modalità di Visualizzazione</h2>
            <p className="text-center text-gray-600 max-w-2xl mx-auto">
              Limbus offre diversi modi di visualizzare i sussurri, ognuno con la sua estetica unica
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
              className="bg-gradient-to-b from-green-50 to-green-100 p-6 rounded-2xl overflow-hidden relative h-80 shadow-md hover:shadow-lg transition-all group"
            >
              <motion.div 
                className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-20 transition-opacity"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ repeat: Infinity, duration: 5 }}
              >
                <Leaf className="text-green-500 h-32 w-32" />
              </motion.div>
              <div className="relative z-10">
                <motion.div
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    y: [0, -5, 0]
                  }}
                  transition={{ repeat: Infinity, duration: 4 }}
                >
                  <Leaf className="h-8 w-8 text-green-600 mb-4" />
                </motion.div>
                <h3 className="text-xl font-semibold text-green-800 mb-2">Foglie</h3>
                <p className="text-green-700">
                  I sussurri si muovono delicatamente come foglie al vento, ondeggiando con un ritmo naturale e rilassante.
                </p>
              </div>
              <div className="absolute bottom-4 right-4">
                <motion.div 
                  className="animate-foglia bg-white/40 border border-white/30 p-4 rounded-lg shadow-md text-green-800"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                >
                  Un esempio di sussurro...
                </motion.div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
              className="bg-gradient-to-b from-blue-50 to-blue-100 p-6 rounded-2xl overflow-hidden relative h-80 shadow-md hover:shadow-lg transition-all group"
            >
              <motion.div 
                className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-20 transition-opacity"
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.1, 0.2, 0.1]
                }}
                transition={{ repeat: Infinity, duration: 4 }}
              >
                <Droplet className="text-blue-500 h-32 w-32" />
              </motion.div>
              <div className="relative z-10">
                <motion.div
                  animate={{ 
                    y: [0, 5, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ repeat: Infinity, duration: 3 }}
                >
                  <Droplet className="h-8 w-8 text-blue-600 mb-4" />
                </motion.div>
                <h3 className="text-xl font-semibold text-blue-800 mb-2">Gocce</h3>
                <p className="text-blue-700">
                  I sussurri appaiono come gocce di pioggia, con un effetto liquido che crea un'atmosfera serena e contemplativa.
                </p>
              </div>
              <div className="absolute bottom-4 right-4">
                <motion.div 
                  className="animate-goccia bg-white/40 border border-white/30 p-4 rounded-lg shadow-md text-blue-800"
                  animate={{ 
                    scale: [1, 1.03, 1],
                    y: [0, -2, 0]
                  }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  Un esempio di sussurro...
                </motion.div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
              className="bg-gradient-to-b from-gray-50 to-gray-100 p-6 rounded-2xl overflow-hidden relative h-80 shadow-md hover:shadow-lg transition-all group"
            >
              <motion.div 
                className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-20 transition-opacity"
                animate={{ 
                  filter: ["blur(0px)", "blur(2px)", "blur(0px)"],
                  scale: [1, 1.05, 1]
                }}
                transition={{ repeat: Infinity, duration: 6 }}
              >
                <CloudFog className="text-gray-500 h-32 w-32" />
              </motion.div>
              <div className="relative z-10">
                <motion.div
                  animate={{ 
                    x: [0, 5, -5, 0],
                    filter: ["blur(0px)", "blur(1px)", "blur(0px)"]
                  }}
                  transition={{ repeat: Infinity, duration: 5 }}
                >
                  <CloudFog className="h-8 w-8 text-gray-600 mb-4" />
                </motion.div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Nebbia</h3>
                <p className="text-gray-700">
                  I sussurri sono avvolti in un velo di nebbia, creando un'atmosfera misteriosa e sognante.
                </p>
              </div>
              <div className="absolute bottom-4 right-4">
                <motion.div 
                  className="animate-nebbia backdrop-blur-md bg-white/20 p-4 rounded-lg shadow-md text-gray-800"
                  animate={{ 
                    filter: ["blur(0px)", "blur(1px)", "blur(0px)"],
                    opacity: [0.9, 0.7, 0.9]
                  }}
                  transition={{ repeat: Infinity, duration: 4 }}
                >
                  Un esempio di sussurro...
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-limbus-100/80 via-purple-100/50 to-blue-100/60 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/wave-pattern.svg')] opacity-5" />
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/10"
              style={{
                width: `${Math.random() * 100 + 50}px`,
                height: `${Math.random() * 100 + 50}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, Math.random() * 50 - 25],
                y: [0, Math.random() * 50 - 25],
                scale: [1, Math.random() * 0.3 + 0.8, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
        <div className="container mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 backdrop-blur-sm text-limbus-800 mb-6"
            >
              <motion.div
                animate={{ 
                  rotate: [0, 180, 360],
                  scale: [1, 1.2, 1]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Star className="h-4 w-4" />
              </motion.div>
              <span className="text-sm font-medium">Unisciti alla community</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="text-3xl font-bold bg-gradient-to-r from-limbus-800 to-limbus-600 bg-clip-text text-transparent mb-6"
            >
              Pronto ad entrare nel Limbo?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
              className="text-xl text-gray-600 mb-10"
            >
              Unisciti a noi e lascia che i tuoi pensieri trovino il loro spazio in questo limbo digitale.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                asChild 
                size="lg" 
                className="rounded-full px-8 shadow-lg hover:shadow-xl transition-all bg-gradient-to-r from-limbus-500 to-limbus-700 hover:from-limbus-600 hover:to-limbus-800"
              >
                <Link to="/whispers">
                  <motion.div 
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="mr-2"
                  >
                    <MessageCircle className="h-5 w-5" />
                  </motion.div>
                  Inizia a sussurrare
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-4 bg-gradient-to-b from-limbus-900 to-limbus-950 text-white">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 mb-6 md:mb-0"
            >
              <motion.div 
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{ repeat: Infinity, duration: 4 }}
              >
                <MessageCircle className="h-6 w-6" />
              </motion.div>
              <h2 className="text-xl font-bold">Limbus</h2>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-center md:text-right"
            >
              <p className="text-gray-400">© {new Date().getFullYear()} Limbus. Tutti i diritti riservati.</p>
              <p className="mt-1 text-sm text-gray-500">Un luogo dove i pensieri si librano come sussurri.</p>
            </motion.div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
