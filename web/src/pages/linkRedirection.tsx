import { getLink } from "@/api/getLink";
import { updateLinkViews } from "@/api/updateLinkViews";
import logoIcon from "@/assets/icon.svg";
import { Card, CardContent } from "@/components/ui/card";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

export default function LinkRedirection() {
  const queryClient = useQueryClient();
  const { alias } = useParams();
  const navigate = useNavigate();

  const { data: linkData, isError } = useQuery({
    enabled: !!alias,
    queryKey: ["get-link"],
    queryFn: () => getLink(alias!),
    retry: (failureCount, error) => {
      // Do not retry on 404 errors
      if (error.message.includes("404")) {
        return false;
      }
      // Retry up to 3 times for other errors
      return failureCount < 3;
    },
  });

  const { mutateAsync: updateLinkViewsFn } = useMutation({
    mutationFn: updateLinkViews,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["get-links"] });
      if (linkData?.url) {
        window.location.href = linkData.url;
      }
    },
    onError(error) {
      if (isAxiosError(error)) {
        toast.error("Erro ao atualizar views", {
          description: error.response?.data.message,
        });
      } else {
        toast.error(`Erro ao atualizar views.`);
      }
    },
  });

  useEffect(() => {
    if (linkData) {
      updateLinkViewsFn(linkData.id);
    }
  }, [linkData, updateLinkViewsFn]);

  if (isError) {
    navigate("/404");
  }

  return (
    <div className="max-w-5xl h-dvh mx-auto flex flex-col justify-center px-3">
      <Card className="py-12 px-5">
        <CardContent className="flex flex-col items-center gap-6">
          <img src={logoIcon} className="h-12" />
          <span className="text-xl text-gray-600">Redirecionando...</span>
          <div className="text-md text-gray-500 text-center flex flex-col gap-1">
            <p>O link será aberto automaticamente em alguns instantes. </p>
            <p>
              Não foi redirecionado?{" "}
              <a
                href={linkData?.url}
                target="_blank"
                className="text-md text-blue-base"
              >
                Acesse aqui
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
