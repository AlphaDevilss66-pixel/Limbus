
import React from "react";
import { Timeline } from "@/components/ui/timeline";
import { motion } from "framer-motion";
import { BookOpen, MessageCircle, Send, ShieldCheck, Sparkles } from "lucide-react";

export const TimelineSection = () => {
  const data = [
    {
      title: "Crea",
      content: (
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
          <p className="text-white/80 text-xs md:text-sm font-normal mb-8">
            Limbus è un luogo dove puoi condividere i tuoi pensieri in modo anonimo e significativo. Un ambiente dove le tue parole possono connettersi con persone affini.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div 
              whileHover={{ scale: 1.03 }}
              className="flex flex-col gap-3 backdrop-blur-xl bg-white/5 border border-white/10 p-4 rounded-lg"
            >
              <div className="backdrop-blur-md bg-white/10 border border-white/10 p-3 rounded-xl inline-flex w-fit">
                <Sparkles className="h-6 w-6 text-white/90" />
              </div>
              <h4 className="text-white/90 font-medium">Condividi Pensieri</h4>
              <p className="text-white/70 text-xs">Esprimi i tuoi pensieri più profondi in modo anonimo, lasciando una traccia della tua essenza nel mondo.</p>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.03 }}
              className="flex flex-col gap-3 backdrop-blur-xl bg-white/5 border border-white/10 p-4 rounded-lg"
            >
              <div className="backdrop-blur-md bg-white/10 border border-white/10 p-3 rounded-xl inline-flex w-fit">
                <Send className="h-6 w-6 text-white/90" />
              </div>
              <h4 className="text-white/90 font-medium">Messaggio al Destino</h4>
              <p className="text-white/70 text-xs">Affida i tuoi pensieri al futuro, lasciando che appaiano in momenti inaspettati e a persone sconosciute.</p>
            </motion.div>
          </div>
        </div>
      ),
    },
    {
      title: "Scopri",
      content: (
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
          <p className="text-white/80 text-xs md:text-sm font-normal mb-8">
            Esplora un mondo di pensieri condivisi e scopri connessioni con persone che hanno vissuto esperienze simili alle tue.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div 
              whileHover={{ scale: 1.03 }}
              className="flex flex-col gap-3 backdrop-blur-xl bg-white/5 border border-white/10 p-4 rounded-lg"
            >
              <div className="backdrop-blur-md bg-white/10 border border-white/10 p-3 rounded-xl inline-flex w-fit">
                <BookOpen className="h-6 w-6 text-white/90" />
              </div>
              <h4 className="text-white/90 font-medium">Biblioteca Invisibile</h4>
              <p className="text-white/70 text-xs">Accedi a pensieri profondi, visibili solo a chi ha condiviso qualcosa di sé.</p>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.03 }}
              className="flex flex-col gap-3 backdrop-blur-xl bg-white/5 border border-white/10 p-4 rounded-lg"
            >
              <div className="backdrop-blur-md bg-white/10 border border-white/10 p-3 rounded-xl inline-flex w-fit">
                <ShieldCheck className="h-6 w-6 text-white/90" />
              </div>
              <h4 className="text-white/90 font-medium">Uno Spazio Sicuro</h4>
              <p className="text-white/70 text-xs">La tua privacy è importante. Puoi esprimere i tuoi pensieri più intimi in un ambiente protetto e rispettoso.</p>
            </motion.div>
          </div>
        </div>
      ),
    },
    {
      title: "Connetti",
      content: (
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
          <p className="text-white/80 text-xs md:text-sm font-normal mb-8">
            Crea connessioni significative basate sulla risonanza emotiva. Su Limbus, le relazioni nascono dalla condivisione autentica di pensieri ed emozioni.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div 
              whileHover={{ scale: 1.03 }}
              className="flex flex-col gap-3 backdrop-blur-xl bg-white/5 border border-white/10 p-4 rounded-lg"
            >
              <div className="backdrop-blur-md bg-white/10 border border-white/10 p-3 rounded-xl inline-flex w-fit">
                <MessageCircle className="h-6 w-6 text-white/90" />
              </div>
              <h4 className="text-white/90 font-medium">Risonanze Emotive</h4>
              <p className="text-white/70 text-xs">Interagisci con pensieri che risuonano con te, creando connessioni basate su esperienze condivise.</p>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.03 }}
              className="flex flex-col gap-3 backdrop-blur-xl bg-white/5 border border-white/10 p-4 rounded-lg"
            >
              <div className="backdrop-blur-md bg-white/10 border border-white/10 p-3 rounded-xl inline-flex w-fit">
                <Sparkles className="h-6 w-6 text-white/90" />
              </div>
              <h4 className="text-white/90 font-medium">Connessioni Autentiche</h4>
              <p className="text-white/70 text-xs">Crea legami profondi con persone che apprezzano la tua autenticità e condividono le tue esperienze.</p>
            </motion.div>
          </div>
        </div>
      ),
    },
  ];
  
  return (
    <div className="bg-gradient-to-br from-slate-800/80 via-gray-900/80 to-slate-900/80">
      <Timeline data={data} />
    </div>
  );
};
