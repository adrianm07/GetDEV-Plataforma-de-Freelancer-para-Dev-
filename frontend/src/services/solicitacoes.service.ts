import type { Developer } from "../types/developer";
import { api } from "./api";

export interface SolicitacaoResponseDTO {
  id: string;
  status: "PENDENTE" | "ACEITA" | "RECUSADA";
  dataCriacao: string;

  postTitulo: string;
  tecnologias: string; 

  contratanteNome: string;
  contratanteEmail: string;
  contratanteTelefone: string;
  contratanteFoto: string | null;

  desenvolvedor?: Developer;
}
export async function getPendingNotificationCount(): Promise<number> {
  const response = await api.get("/solicitacoes/pending-count");
  return response.data.count;
}

export async function getSolicitacoesUsuarioLogado(){
  const response = await api.get<SolicitacaoResponseDTO[]>("solicitacoes/enviadas");
  return response.data;
}

export async function aceitarSolicitacao(id:string){
  return api.put(`/solicitacoes/${id}/aceitar`);
}

export async function recusarSolicitacao(id:string){
  return api.put(`/solicitacoes/${id}/recusar`);
}