
import { WhisperCard } from "@/components/WhisperCard";
import { WhisperForm } from "@/components/WhisperForm";

const whispers = [
  {
    id: 1,
    content: "A volte mi sento come una foglia che galleggia sull'acqua.",
    emotion: "Nostalgia",
    theme: "Vita",
    resonanceCount: 42,
    isWhisperOfDay: true,
  },
  {
    id: 2,
    content: "Nel silenzio della notte, i sogni parlano più forte delle parole.",
    emotion: "Speranza",
    theme: "Sogni",
    resonanceCount: 23,
  },
  {
    id: 3,
    content: "Ogni tramonto è una promessa di un nuovo inizio.",
    emotion: "Felicità",
    theme: "Vita",
    resonanceCount: 15,
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-limbus-50 to-white px-4 py-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-center text-4xl font-bold text-limbus-900">
          Limbus
        </h1>
        <WhisperForm />
        <div className="mt-8 space-y-6">
          {whispers.map((whisper) => (
            <WhisperCard
              key={whisper.id}
              content={whisper.content}
              emotion={whisper.emotion}
              theme={whisper.theme}
              resonanceCount={whisper.resonanceCount}
              isWhisperOfDay={whisper.isWhisperOfDay}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
