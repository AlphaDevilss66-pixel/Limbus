
import { useState, useEffect } from "react";
import { getPastWhispers } from "@/services/whisperService";
import { WhisperCard } from "@/components/WhisperCard";
import { Whisper } from "@/types";
import { Button } from "@/components/ui/button";
import { ArrowLeft, History } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";

const VociPassato = () => {
  const [whispers, setWhispers] = useState<Whisper[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadWhispers = async () => {
      try {
        setLoading(true);
        const data = await getPastWhispers();
        setWhispers(data);
      } catch (error) {
        console.error("Failed to fetch past whispers:", error);
        toast.error("Impossibile caricare le voci dal passato");
      } finally {
        setLoading(false);
      }
    };

    loadWhispers();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="sm" 
            className="font-semibold p-0"
            onClick={() => navigate("/whispers")}
          >
            <ArrowLeft size={16} className="mr-2" />
            Torna ai sussurri
          </Button>
        </div>

        <div className="text-center my-12">
          <div className="inline-flex items-center justify-center p-4 bg-amber-100 rounded-full mb-4">
            <History className="h-8 w-8 text-amber-700" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Voci dal Passato</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Pensieri dimenticati che ritornano per risuonare con nuove anime. Scopri sussurri dal passato che sono stati riportati alla luce.
          </p>
        </div>
      </motion.div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin h-8 w-8 border-t-2 border-b-2 border-amber-500 rounded-full"></div>
        </div>
      ) : whispers.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-lg text-gray-500">
            Non ci sono ancora voci dal passato da mostrare.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Torna più tardi per scoprire sussurri dal passato.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {whispers.map((whisper) => (
            <WhisperCard key={whisper.id} whisper={whisper} />
          ))}
        </div>
      )}
    </div>
  );
};

export default VociPassato;
