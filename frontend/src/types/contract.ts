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
