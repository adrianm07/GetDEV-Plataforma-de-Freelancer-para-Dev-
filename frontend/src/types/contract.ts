export interface ContractSummary {
  id: string;
  title: string;
  contractorName: string;
  contractorPhoto: string | null;
  description: string;
  technologies: string[];
}

export interface Contract extends ContractSummary {
  fullDescription?: string;
  deadline?: string;
  priceRange?: string;
  email?: string;
  phone?: string;
   status: "DISPONIVEL" | "OCUPADO" | "CONCLUIDO";
}

export interface PostResponseDTO {
  id: string;
  titulo: string;
  resumo: string;
  descricao: string;
  prazo: string;
  precoMin: number | null;
  precoMax: number | null;
  tecnologias: string;
  status: "DISPONIVEL" | "OCUPADO" | "CONCLUIDO";
  dataCriacao: string;
  dataConclusao: string | null;
  contratanteId: string;
  nomeContratante: string;
  fotoContratante:string,
  emailContratante:string,
  telContratante:string,
  desenvolvedorId: string | null;
  nomeDesenvolvedor?: string;
  nota?: number;
  comentario?: string;
}

export interface SummaryPostDTO{
  id: string;
  titulo: string;
  resumo: string;
  precoMin: number;
  precoMax: number;
  tecnologias: string;
  prazo: string;
  status: string;
  nomeContratante: string;
}

export interface Post {
  id: string;
  title: string;
  description: string;
  fullDescription?: string;
  technologies: string[];
  deadline?: string;
  minPrice: number | null;
  maxPrice: number | null;
  email: string;
  phone: string;

  contractorName: string;
  contractorPhoto: string | null;

  developerName?: string;
  developerRating?: number;
  developerReview?: string;

  isCompleted?: boolean;
  completedDate?: string | null;
}

export interface createPostDTO{
    titulo: string,
    resumo: string
    descricao: string
    prazo: string,
    precoMin: number | 0,
    precoMax: number | 0,
    tecnologias: string
}