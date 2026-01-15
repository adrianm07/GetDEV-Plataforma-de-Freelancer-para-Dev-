
import type { PostResponseDTO, Contract, SummaryPostDTO, ContractSummary } from "../types/contract";

export function postToContract(post: PostResponseDTO): Contract {
  return {
    id: post.id,
    title: post.titulo,
    description: post.resumo,
    fullDescription: post.descricao,
    deadline: post.prazo,
    priceRange:
      post.precoMin && post.precoMax
        ? `R$ ${post.precoMin} - R$ ${post.precoMax}`
        : "A combinar",
    technologies: post.tecnologias
      .split(",")
      .map((t) => t.trim()),
    contractorName: post.nomeContratante,
    contractorPhoto: post.fotoContratante,
    email: post.emailContratante, // ajuste se vier do backend
    phone: post.telContratante,       // ajuste se vier do backend
    status: post.status,
  };
}

export function mapSummary(post : SummaryPostDTO) : ContractSummary{
  return {
    id : post.id,
    title : post.titulo,
    description : post.resumo,
    contractorName : post.nomeContratante,
    contractorPhoto : null,
    technologies: post.tecnologias
      .split(",")
      .map(t => t.trim()),
  };
}

  

