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

export interface createPostDTO{
  titulo: string;
  resumo : string;
  descricao: string;
  prazo : string;
  precoMin : number;
  precoMax : number;
  tecnologias : string;
}

export interface Post {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  minPrice: number;
  maxPrice: number;
  deadline?: string;

  contractorName: string;
  contractorPhoto: string | null;

  email: string;
  phone: string;
  developerName?:string,
  isCompleted?: boolean;
}