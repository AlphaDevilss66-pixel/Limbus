
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";

const emotions = [
  "Felicità",
  "Tristezza",
  "Rabbia",
  "Nostalgia",
  "Speranza",
  "Paura",
];

const themes = [
  "Amore",
  "Solitudine",
  "Ricordi",
  "Vita",
  "Morte",
  "Sogni",
  "Desideri",
  "Fallimenti",
];

export const WhisperForm = () => {
  const [content, setContent] = useState("");
  const [emotion, setEmotion] = useState("");
  const [theme, setTheme] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement whisper submission
    console.log({ content, emotion, theme });
    setContent("");
    setEmotion("");
    setTheme("");
  };

  return (
    <form onSubmit={handleSubmit} className="whisper-card space-y-4">
      <Textarea
        placeholder="Condividi il tuo pensiero..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="min-h-[120px] resize-none bg-transparent text-lg"
      />
      <div className="flex gap-4">
        <Select
          value={emotion}
          onValueChange={setEmotion}
          options={emotions}
          placeholder="Emozione"
          className="w-1/2"
        />
        <Select
          value={theme}
          onValueChange={setTheme}
          options={themes}
          placeholder="Tema"
          className="w-1/2"
        />
      </div>
      <div className="flex justify-end">
        <Button type="submit" className="bg-limbus-600 hover:bg-limbus-700">
          Sussurra
        </Button>
      </div>
    </form>
  );
};
