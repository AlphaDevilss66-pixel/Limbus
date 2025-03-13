
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export const FooterSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-20 text-center"
    >
      <motion.div 
        className="max-w-3xl mx-auto backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-12 shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
        animate={{ boxShadow: ["0 4px 20px rgba(0,0,0,0.1)", "0 4px 30px rgba(255,255,255,0.03)", "0 4px 20px rgba(0,0,0,0.1)"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white/95 to-white/75">
            Pronto a iniziare il tuo viaggio?
          </h2>
          <p className="text-white/70 mb-10">
            Unisciti alla comunità di persone che condividono i loro pensieri più profondi e scoprono connessioni inaspettate.
          </p>
          <Button
            asChild
            size="lg"
            className="backdrop-blur-lg bg-white/10 border border-white/20 hover:bg-white/15 hover:border-white/30 rounded-full px-8 py-7 text-lg shadow-[0_0_15px_rgba(255,255,255,0.1)] relative overflow-hidden group transition-all duration-300"
          >
            <Link to="/auth" className="flex items-center">
              <span className="relative z-10">Crea il tuo primo pensiero</span> 
              <motion.span
                className="relative z-10 ml-2"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowRight className="h-5 w-5" />
              </motion.span>
              <motion.div 
                className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                animate={{ 
                  background: [
                    "linear-gradient(90deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.1) 100%)",
                    "linear-gradient(90deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
                    "linear-gradient(90deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.1) 100%)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
            </Link>
          </Button>
        </motion.div>
      </motion.div>

      <motion.footer 
        className="py-10 text-center text-white/40 text-sm mt-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        viewport={{ once: true }}
      >
        <p>© {new Date().getFullYear()} Pensieri Nell'Essenza • Un'esperienza immersiva di condivisione</p>
      </motion.footer>
    </motion.section>
  );
};
