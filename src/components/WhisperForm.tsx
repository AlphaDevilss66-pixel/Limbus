
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
        <Select value={emotion} onValueChange={setEmotion}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Emozione" />
          </SelectTrigger>
          <SelectContent>
            {emotions.map((emotion) => (
              <SelectItem key={emotion} value={emotion}>
                {emotion}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={theme} onValueChange={setTheme}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Tema" />
          </SelectTrigger>
          <SelectContent>
            {themes.map((theme) => (
              <SelectItem key={theme} value={theme}>
                {theme}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex justify-end">
        <Button type="submit" className="bg-limbus-600 hover:bg-limbus-700">
          Sussurra
        </Button>
      </div>
    </form>
  );
};
