
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
export function mapPostResponseToPost(dto: PostResponseDTO): Post {
  return {
    id: (dto.id), // ⚠️ backend manda string (UUID)
    title: dto.titulo,
    description: dto.resumo,
    fullDescription: dto.descricao,

    technologies: dto.tecnologias
      ? dto.tecnologias.split(",").map(t => t.trim())
      : [],

    deadline: dto.prazo,

    minPrice: Number(dto.precoMin),
    maxPrice: Number(dto.precoMax),

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

export function mapFormToUpdatePostDTO(data: PostFormData) {
  return {
    titulo: data.title || null,
    resumo: data.description || null,
    descricao: data.fullDescription || null,
    prazo: data.deadline || null,
    precoMin: data.minPrice ?? null,
    precoMax: data.maxPrice ?? null,
    tecnologias: data.technologies?.length
      ? data.technologies.join(",")
      : null,
  };
}

export function mapFormToPostUpdate(data: PostFormData, original: Post): Post {
  return {
    ...original,
    title: data.title,
    description: data.description,
    fullDescription: data.fullDescription,
    technologies: data.technologies,
    deadline: data.deadline,
    minPrice: data.minPrice ? Number(data.minPrice) : null,
    maxPrice: data.maxPrice ? Number(data.maxPrice) : null,
  };
}

  

