import { api } from "@/lib/axios";

interface IExportResponse {
  reportUrl: string;
}
export async function downloadLinks() {
  const response = await api.get<IExportResponse>(`/links/exports`);
  return response.data;
}
