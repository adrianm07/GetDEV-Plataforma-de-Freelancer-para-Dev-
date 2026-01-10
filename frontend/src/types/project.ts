export interface SummaryPost {
  id: string;
  titulo: string;
  resumo: string;
  precoMin: number;
  precoMax: number;
  tecnologias: string; // string como vem da API
  prazo: string;
  status: string;
  nomeContratante: string;
}