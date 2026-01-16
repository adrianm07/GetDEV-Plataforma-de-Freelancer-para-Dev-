import type { Developer } from "../types/developer";
import type { SolicitacaoResponseDTO } from "../services/solicitacoes.service";
import type { NotificationDTO, NotificationStatus } from "../types/notification";

export function mapSolicitacaoToNotification(
  dto: SolicitacaoResponseDTO
): NotificationDTO {
  const developer: Developer | undefined = dto.desenvolvedor
    ? {
        id: dto.desenvolvedor.id,
        nome: dto.desenvolvedor.nome,
        email: dto.desenvolvedor.email,
        telefone: dto.desenvolvedor.telefone,
        foto: dto.desenvolvedor.foto,
        skills: dto.desenvolvedor.skills,
        projects: dto.desenvolvedor.projects?.map((p) => ({
          id: p.id,
          titulo: p.titulo,
          resumo: p.resumo,
          precoMin: p.precoMin,
          precoMax: p.precoMax,
          tecnologias: p.tecnologias, // string, como vem da API
          prazo: p.prazo,
          status: p.status,
          nomeContratante: p.nomeContratante,
        })) ?? [],
      }
    : undefined;

  return {
    id: dto.id,
    contractTitle: dto.postTitulo,
    technologies: dto.tecnologias.split(",").map((t) => t.trim()),

    contractorName: dto.contratanteNome,
    contractorEmail: dto.contratanteEmail,
    contractorPhone: dto.contratanteTelefone,
    contractorPhoto: dto.contratanteFoto,

    status: dto.status as NotificationStatus,
    appliedDate: new Date(dto.dataCriacao).toLocaleDateString("pt-BR"),

    developer,
  };
}
