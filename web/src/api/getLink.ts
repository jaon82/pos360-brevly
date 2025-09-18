import type { ILinkAliasResponse } from "@/interfaces/linkAlias";
import { api } from "@/lib/axios";

export async function getLink(alias: string) {
  const response = await api.get<ILinkAliasResponse>(`/links/${alias}`);
  return response.data;
}
