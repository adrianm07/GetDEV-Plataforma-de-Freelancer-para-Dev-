
import type { PostFormData } from "../components/contracts/PostFormPanel";
import type { PostResponseDTO, Contract, SummaryPostDTO, ContractSummary, Post, createPostDTO } from "../types/contract";

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

export function mapSummaryPostDTOToPost(
  dto: SummaryPostDTO
): Post {
  return {
    id: (dto.id),
    title: dto.titulo,
    description: dto.resumo,
    technologies: dto.tecnologias
      .split(",")
      .map((tech) => tech.trim()),
    minPrice: dto.precoMin,
    maxPrice: dto.precoMax,
    deadline: dto.prazo,
    contractorName: dto.nomeContratante,
    contractorPhoto: null, 
    email: "", 
    phone: "", 
    isCompleted: dto.status === "CONCLUIDO",
  };
}

export function mapFormToCreatePostDTO(
  data: PostFormData
): createPostDTO {
  return {
    titulo: data.title,
    resumo: data.description,
    descricao: data.fullDescription,
    prazo: data.deadline,
    precoMin: data.minPrice ? Number(data.minPrice) : 0,
    precoMax: data.maxPrice ? Number(data.maxPrice) : 0,
    tecnologias: data.technologies.join(", "),
  };
}

  

