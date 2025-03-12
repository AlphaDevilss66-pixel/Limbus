
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Leaf, Droplet, CloudFog, MessageCircle, Heart, Send, LogIn, LogOut, User } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-b from-limbus-50 to-white">
      {/* Header */}
      <header className={`fixed w-full transition-all duration-300 z-50 ${scrolled ? "bg-white/80 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <MessageCircle className="h-6 w-6 text-limbus-600" />
            <h1 className="text-2xl font-bold text-limbus-900">Limbus</h1>
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Button asChild variant="ghost" className="flex items-center gap-2">
                  <Link to="/whispers">
                    <MessageCircle className="h-4 w-4" />
                    <span>I miei sussurri</span>
                  </Link>
                </Button>
                <Button variant="outline" size="sm" onClick={() => signOut()} className="flex items-center gap-2">
                  <LogOut className="h-4 w-4" />
                  <span>Esci</span>
                </Button>
              </>
            ) : (
              <Button asChild variant="default" size="sm" className="flex items-center gap-2">
                <Link to="/auth">
                  <LogIn className="h-4 w-4" />
                  <span>Accedi</span>
                </Link>
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-limbus-900 mb-6">
              Condividi i tuoi pensieri nel limbo digitale
            </h1>
            <p className="text-xl text-gray-600 mb-10">
              Limbus è uno spazio dove i pensieri si librano nell'aria come sussurri, 
              senza peso e senza giudizio. Un luogo dove condividere emozioni, 
              riflessioni e storie in totale anonimato.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="rounded-full px-8 shadow-lg hover:shadow-xl transition-all">
                <Link to="/whispers">
                  <Send className="mr-2 h-5 w-5" />
                  Inizia a sussurrare
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8">
                <Link to="/auth">
                  <User className="mr-2 h-5 w-5" />
                  Crea un account
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-limbus-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-limbus-900 mb-16">Come funziona Limbus</h2>
          
          <div className="grid md:grid-cols-3 gap-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="glass p-8 rounded-2xl text-center"
            >
              <div className="bg-limbus-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6">
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
              className="glass p-8 rounded-2xl text-center"
            >
              <div className="bg-limbus-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6">
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
              className="glass p-8 rounded-2xl text-center"
            >
              <div className="bg-limbus-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6">
                <Leaf className="h-8 w-8 text-limbus-600" />
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
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-limbus-900 mb-4">Modalità di Visualizzazione</h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-16">
            Limbus offre diversi modi di visualizzare i sussurri, ognuno con la sua estetica unica
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-gradient-to-b from-green-50 to-green-100 p-6 rounded-2xl overflow-hidden relative h-80 shadow-md hover:shadow-lg transition-all"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <Leaf className="text-green-500 h-32 w-32 opacity-10" />
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
              className="bg-gradient-to-b from-blue-50 to-blue-100 p-6 rounded-2xl overflow-hidden relative h-80 shadow-md hover:shadow-lg transition-all"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <Droplet className="text-blue-500 h-32 w-32 opacity-10" />
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
              className="bg-gradient-to-b from-gray-50 to-gray-100 p-6 rounded-2xl overflow-hidden relative h-80 shadow-md hover:shadow-lg transition-all"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <CloudFog className="text-gray-500 h-32 w-32 opacity-10" />
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
      <section className="py-20 px-4 bg-gradient-to-b from-limbus-50 to-limbus-100">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-limbus-900 mb-6">
              Pronto ad entrare nel Limbo?
            </h2>
            <p className="text-xl text-gray-600 mb-10">
              Unisciti a noi e lascia che i tuoi pensieri trovino il loro spazio in questo limbo digitale.
            </p>
            <Button asChild size="lg" className="rounded-full px-8 shadow-lg hover:shadow-xl transition-all">
              <Link to="/whispers">
                <MessageCircle className="mr-2 h-5 w-5" />
                Inizia a sussurrare
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-4 bg-limbus-900 text-white">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-6 md:mb-0">
              <MessageCircle className="h-6 w-6" />
              <h2 className="text-xl font-bold">Limbus</h2>
            </div>
            <div className="text-center md:text-right text-sm text-gray-400">
              <p>© {new Date().getFullYear()} Limbus. Tutti i diritti riservati.</p>
              <p className="mt-1">Un luogo dove i pensieri si librano come sussurri.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
