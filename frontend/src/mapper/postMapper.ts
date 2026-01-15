
import type { PostResponseDTO, Contract, SummaryPostDTO, ContractSummary, Post } from "../types/contract";

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
export function mapPostResponseToPost(dto: PostResponseDTO): Post {
  return {
    id: Number(dto.id), // ⚠️ backend manda string (UUID)
    title: dto.titulo,
    description: dto.resumo,
    fullDescription: dto.descricao,

    technologies: dto.tecnologias
      ? dto.tecnologias.split(",").map(t => t.trim())
      : [],

    deadline: dto.prazo,

    minPrice: dto.precoMin,
    maxPrice: dto.precoMax,

    email: dto.emailContratante,
    phone: dto.telContratante,

    contractorName: dto.nomeContratante,
    contractorPhoto: dto.fotoContratante ?? null,

    developerName: dto.developerName,
    developerRating: dto.developerRating,
    developerReview: dto.developerReview,

    isCompleted: dto.status === "CONCLUIDO",
    completedDate: dto.dataConclusao,
  };
}




  

