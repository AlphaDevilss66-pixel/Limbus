
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Leaf, Droplet, CloudFog, MessageCircle, Heart, Send, LogIn, LogOut, User, Star, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const Landing = () => {
  const { user, signOut } = useAuth();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f9fe] via-[#e8eaf7] to-white overflow-hidden">
      {/* Header */}
      <header className={`fixed w-full transition-all duration-500 z-50 ${
        scrolled ? "bg-white/80 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
      }`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <MessageCircle className="h-6 w-6 text-limbus-600" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-limbus-600 to-limbus-800 bg-clip-text text-transparent">
              Limbus
            </h1>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
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
          transition={{ duration: 0.8 }}
          className="container mx-auto relative"
        >
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-6 inline-block"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-limbus-100 to-limbus-200 text-limbus-800">
                <Sparkles className="h-4 w-4" />
                <span className="text-sm font-medium">Scopri il potere dei sussurri</span>
              </div>
            </motion.div>
            <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-gradient-to-r from-limbus-800 via-limbus-700 to-limbus-600 bg-clip-text mb-6 leading-tight">
              Condividi i tuoi pensieri nel limbo digitale
            </h1>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              Limbus è uno spazio dove i pensieri si librano nell'aria come sussurri, 
              senza peso e senza giudizio. Un luogo dove condividere emozioni, 
              riflessioni e storie in totale anonimato.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="rounded-full px-8 shadow-lg hover:shadow-xl transition-all bg-gradient-to-r from-limbus-500 to-limbus-700 hover:from-limbus-600 hover:to-limbus-800"
              >
                <Link to="/whispers">
                  <Send className="mr-2 h-5 w-5" />
                  Inizia a sussurrare
                </Link>
              </Button>
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
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-limbus-50 relative overflow-hidden">
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
              className="glass p-8 rounded-2xl text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="bg-gradient-to-br from-limbus-100 to-limbus-200 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6 shadow-inner">
                <MessageCircle className="h-8 w-8 text-limbus-600" />
              </div>
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
              className="glass p-8 rounded-2xl text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="bg-gradient-to-br from-limbus-100 to-limbus-200 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6 shadow-inner">
                <Heart className="h-8 w-8 text-limbus-600" />
              </div>
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
              className="glass p-8 rounded-2xl text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="bg-gradient-to-br from-limbus-100 to-limbus-200 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6 shadow-inner">
                <Star className="h-8 w-8 text-limbus-600" />
              </div>
              <h3 className="text-xl font-semibold text-limbus-900 mb-4">Visualizzazioni Uniche</h3>
              <p className="text-gray-600">
                Scegli come visualizzare i sussurri: come foglie che ondeggiano, gocce che cadono o nebbia che avvolge.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Visual Modes Section */}
      <section className="py-20 px-4 relative overflow-hidden">
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
              className="bg-gradient-to-b from-green-50 to-green-100 p-6 rounded-2xl overflow-hidden relative h-80 shadow-md hover:shadow-lg transition-all group"
            >
              <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-20 transition-opacity">
                <Leaf className="text-green-500 h-32 w-32" />
              </div>
              <div className="relative z-10">
                <Leaf className="h-8 w-8 text-green-600 mb-4" />
                <h3 className="text-xl font-semibold text-green-800 mb-2">Foglie</h3>
                <p className="text-green-700">
                  I sussurri si muovono delicatamente come foglie al vento, ondeggiando con un ritmo naturale e rilassante.
                </p>
              </div>
              <div className="absolute bottom-4 right-4">
                <div className="animate-foglia bg-white/40 border border-white/30 p-4 rounded-lg shadow-md text-green-800">
                  Un esempio di sussurro...
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gradient-to-b from-blue-50 to-blue-100 p-6 rounded-2xl overflow-hidden relative h-80 shadow-md hover:shadow-lg transition-all group"
            >
              <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-20 transition-opacity">
                <Droplet className="text-blue-500 h-32 w-32" />
              </div>
              <div className="relative z-10">
                <Droplet className="h-8 w-8 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold text-blue-800 mb-2">Gocce</h3>
                <p className="text-blue-700">
                  I sussurri appaiono come gocce di pioggia, con un effetto liquido che crea un'atmosfera serena e contemplativa.
                </p>
              </div>
              <div className="absolute bottom-4 right-4">
                <div className="animate-goccia bg-white/40 border border-white/30 p-4 rounded-lg shadow-md text-blue-800">
                  Un esempio di sussurro...
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-gradient-to-b from-gray-50 to-gray-100 p-6 rounded-2xl overflow-hidden relative h-80 shadow-md hover:shadow-lg transition-all group"
            >
              <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-20 transition-opacity">
                <CloudFog className="text-gray-500 h-32 w-32" />
              </div>
              <div className="relative z-10">
                <CloudFog className="h-8 w-8 text-gray-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Nebbia</h3>
                <p className="text-gray-700">
                  I sussurri sono avvolti in un velo di nebbia, creando un'atmosfera misteriosa e sognante.
                </p>
              </div>
              <div className="absolute bottom-4 right-4">
                <div className="animate-nebbia backdrop-blur-md bg-white/20 p-4 rounded-lg shadow-md text-gray-800">
                  Un esempio di sussurro...
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-limbus-50 to-limbus-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/wave-pattern.svg')] opacity-5" />
        <div className="container mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 backdrop-blur-sm text-limbus-800 mb-6">
              <Star className="h-4 w-4" />
              <span className="text-sm font-medium">Unisciti alla community</span>
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-limbus-800 to-limbus-600 bg-clip-text text-transparent mb-6">
              Pronto ad entrare nel Limbo?
            </h2>
            <p className="text-xl text-gray-600 mb-10">
              Unisciti a noi e lascia che i tuoi pensieri trovino il loro spazio in questo limbo digitale.
            </p>
            <Button 
              asChild 
              size="lg" 
              className="rounded-full px-8 shadow-lg hover:shadow-xl transition-all bg-gradient-to-r from-limbus-500 to-limbus-700 hover:from-limbus-600 hover:to-limbus-800"
            >
              <Link to="/whispers">
                <MessageCircle className="mr-2 h-5 w-5" />
                Inizia a sussurrare
              </Link>
            </Button>
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
              <MessageCircle className="h-6 w-6" />
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
