import type { SummaryPost } from "./project";

export interface Developer {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  foto: string;
  skills: string[];
  projects?: SummaryPost[];
}