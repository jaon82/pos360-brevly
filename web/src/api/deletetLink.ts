import { api } from "@/lib/axios";

export async function deleteLink(id: string) {
  await api.delete(`/links/${id}`);
}
