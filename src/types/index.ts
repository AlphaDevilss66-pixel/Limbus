

export type Emotion =
  | "Felicità"
  | "Tristezza"
  | "Rabbia"
  | "Nostalgia"
  | "Speranza"
  | "Paura"
  | "";

export type Theme =
  | "Amore"
  | "Solitudine"
  | "Ricordi"
  | "Vita"
  | "Morte"
  | "Sogni"
  | "Desideri"
  | "Fallimenti"
  | "";

export type VisualMode = "foglie" | "gocce" | "nebbia" | "standard";

export type WhisperMode = "vento" | "fuoco" | "standard";

export type WhisperSpecialType = "biblioteca" | "destino" | "tempo" | "passato" | "normale";

export type ResonanceType = "comprendo" | "anchio" | "pensare" | "sentire" | "condivido";

export interface Whisper {
  id: number;
  content: string;
  emotion?: Emotion;
  theme?: Theme;
  createdAt: Date;
  audioUrl?: string;
  resonanceCount: number;
  resonances: {
    type: ResonanceType;
    count: number;
  }[];
  mode: WhisperMode;
  isWhisperOfDay?: boolean;
  responses?: WhisperResponse[];
  specialType?: WhisperSpecialType;
  releaseDate?: Date; // For time capsule whispers
  isSecret?: boolean; // For invisible library
}

export interface WhisperResponse {
  id: number;
  content: string;
  createdAt: Date;
  parentId: number;
}
