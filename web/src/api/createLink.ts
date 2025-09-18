import { api } from "@/lib/axios";

export interface CreateLinkBody {
  url: string;
  alias: string;
}

export async function createLink({ url, alias }: CreateLinkBody) {
  const response = await api.post("/links", {
    url,
    alias,
  });
  return response.data;
}
