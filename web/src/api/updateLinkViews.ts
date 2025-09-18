import { api } from "@/lib/axios";

export async function updateLinkViews(id: string) {
  const response = await api.patch(`/links/${id}/views`);
  return response.data;
}
