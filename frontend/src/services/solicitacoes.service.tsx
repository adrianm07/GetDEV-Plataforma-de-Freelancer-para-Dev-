import { api } from "./api";

export async function getPendingNotificationCount(): Promise<number> {
  const response = await api.get("/solicitacoes/pending-count");
  return response.data.count;
}
