import { getLink } from "@/api/getLink";
import logoIcon from "@/assets/icon.svg";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

export default function LinkRedirection() {
  const { alias } = useParams();

  const { data: linkData, isSuccess } = useQuery({
    enabled: !!alias,
    queryKey: ["get-link"],
    queryFn: () => getLink(alias!),
  });

  if (isSuccess) {
    window.location.href = linkData.url;
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
