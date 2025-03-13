
import React from "react";
import { Timeline } from "@/components/ui/timeline";
import { motion } from "framer-motion";
import { BookOpen, MessageCircle, Send, ShieldCheck, Sparkles } from "lucide-react";

export const TimelineSection = () => {
  const data = [
    {
      title: "Crea",
      content: (
        <div className="backdrop-blur-md bg-indigo-500/10 rounded-xl p-6 border border-indigo-300/10 shadow-[0_0_15px_rgba(139,92,246,0.2)]">
          <p className="text-indigo-100 text-xs md:text-sm font-normal mb-8">
            Su Limbus puoi condividere i tuoi pensieri più profondi in modo anonimo e significativo. Un luogo dove le tue parole possono risuonare con persone affini.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex flex-col gap-3 backdrop-blur-md bg-indigo-600/20 p-4 rounded-lg border border-indigo-400/20"
            >
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-3 rounded-xl inline-flex shadow-glow w-fit">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-white font-medium">Sussurri nell'Infinito</h4>
              <p className="text-indigo-100 text-xs">Condividi i tuoi pensieri più profondi in modo anonimo, lasciando una traccia della tua essenza nel mondo.</p>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex flex-col gap-3 backdrop-blur-md bg-indigo-600/20 p-4 rounded-lg border border-indigo-400/20"
            >
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-3 rounded-xl inline-flex shadow-glow w-fit">
                <Send className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-white font-medium">Messaggio al Destino</h4>
              <p className="text-indigo-100 text-xs">Affida i tuoi pensieri al futuro, lasciando che appaiano in momenti inaspettati e a persone sconosciute.</p>
            </motion.div>
          </div>
        </div>
      ),
    },
    {
      title: "Scopri",
      content: (
        <div className="backdrop-blur-md bg-purple-500/10 rounded-xl p-6 border border-purple-300/10 shadow-[0_0_15px_rgba(139,92,246,0.2)]">
          <p className="text-indigo-100 text-xs md:text-sm font-normal mb-8">
            Esplora un mondo di pensieri condivisi e scopri connessioni inaspettate con persone che hanno vissuto esperienze simili alle tue.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex flex-col gap-3 backdrop-blur-md bg-purple-600/20 p-4 rounded-lg border border-purple-400/20"
            >
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-3 rounded-xl inline-flex shadow-glow w-fit">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-white font-medium">Biblioteca Invisibile</h4>
              <p className="text-indigo-100 text-xs">Accedi a pensieri segreti e profondi, visibili solo a chi ha condiviso qualcosa di sé.</p>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex flex-col gap-3 backdrop-blur-md bg-purple-600/20 p-4 rounded-lg border border-purple-400/20"
            >
              <div className="bg-gradient-to-r from-violet-600 to-purple-700 p-3 rounded-xl inline-flex shadow-glow w-fit">
                <ShieldCheck className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-white font-medium">Uno Spazio Sicuro</h4>
              <p className="text-indigo-100 text-xs">La tua privacy è importante. Puoi esprimere i tuoi pensieri più intimi in un ambiente protetto e rispettoso.</p>
            </motion.div>
          </div>
        </div>
      ),
    },
    {
      title: "Connetti",
      content: (
        <div className="backdrop-blur-md bg-blue-500/10 rounded-xl p-6 border border-blue-300/10 shadow-[0_0_15px_rgba(139,92,246,0.2)]">
          <p className="text-indigo-100 text-xs md:text-sm font-normal mb-8">
            Crea connessioni significative basate sulla risonanza emotiva. Su Limbus, le relazioni nascono dalla condivisione autentica di pensieri ed emozioni.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex flex-col gap-3 backdrop-blur-md bg-blue-600/20 p-4 rounded-lg border border-blue-400/20"
            >
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-xl inline-flex shadow-glow w-fit">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-white font-medium">Risonanze Emotive</h4>
              <p className="text-indigo-100 text-xs">Interagisci con pensieri che risuonano con te, creando connessioni basate su esperienze condivise.</p>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex flex-col gap-3 backdrop-blur-md bg-blue-600/20 p-4 rounded-lg border border-blue-400/20"
            >
              <div className="bg-gradient-to-r from-indigo-600 to-blue-700 p-3 rounded-xl inline-flex shadow-glow w-fit">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-white font-medium">Connessioni Autentiche</h4>
              <p className="text-indigo-100 text-xs">Crea legami profondi con persone che apprezzano la tua autenticità e condividono le tue esperienze.</p>
            </motion.div>
          </div>
        </div>
      ),
    },
  ];
  
  return <Timeline data={data} />;
};
