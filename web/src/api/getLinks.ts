import type { LinksResponse } from "@/interfaces/links";
import { api } from "@/lib/axios";

export async function getLinks() {
  const response = await api.get<LinksResponse[]>(`/links`);
  return response.data;
}
