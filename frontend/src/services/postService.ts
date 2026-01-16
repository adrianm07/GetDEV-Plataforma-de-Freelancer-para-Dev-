import { api } from "./api";
import type { PostResponseDTO, SummaryPostDTO, createPostDTO } from "../types/contract";

export async function getPosts() {
  const response = await api.get<SummaryPostDTO[]>("/posts");
  return response.data;
}

export async function enviarSolicitacao(postID: string) {
  await api.post(`/posts/${postID}/solicitacoes`);
}

export async function listarPostsContratante() {
  const response = await api.get<PostResponseDTO[]>("/posts/me");
  return response.data;
}

export async function createPost(payload: createPostDTO): Promise<void> {
  const response = await api.post("/posts", payload);
  return response.data;
}

export async function updatePost(id:string, payload:any) {
  return await api.put(`/posts/${id}`, payload);
}

export async function deletePost(id:string) {
  await api.delete(`/posts/${id}`);
}

export async function completePost(id:string) {
  await api.patch(`/posts/${id}/concluir`);
}

export async function enviarAvaliacao(postId: string, nota: number, comentario: string) {
  return api.post(`/posts/${postId}/avaliacao`,{
    nota, comentario});
}

export async function deleteDevAceito(postId: string){
  await api.patch(`/posts/${postId}`);
}
