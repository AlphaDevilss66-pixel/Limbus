
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
  );
};
