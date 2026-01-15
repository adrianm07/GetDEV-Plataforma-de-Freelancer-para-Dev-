import { api } from "./api";
import type { SummaryPostDTO } from "../types/contract";

export async function getPosts() {
  const response = await api.get<SummaryPostDTO[]>("/posts");
  return response.data;
}

export async function enviarSolicitacao(postID: string) {
  await api.post(`/posts/${postID}/solicitacoes`);
}

export async function listarPostsContratante() {
  const response = await api.get<SummaryPostDTO[]>("/posts/me");
  return response.data
}