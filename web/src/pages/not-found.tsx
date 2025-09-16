import logoIcon from "@/assets/404.svg";
import { Card, CardContent } from "@/components/ui/card";

export default function NotFound() {
  return (
    <div className="max-w-screen-xl h-dvh mx-auto flex flex-col justify-center px-3">
      <Card className="py-12 px-5">
        <CardContent className="flex flex-col items-center gap-6">
          <img src={logoIcon} className="h-[85px]" />
          <span className="text-xl text-gray-600">Link não encontrado</span>
          <div className="text-md text-gray-500 text-center flex flex-col gap-1">
            <p>
              O link que você está tentando acessar não existe, foi removido ou
              é uma URL inválida.{" "}
            </p>
            <p>
              Saiba mais em{" "}
              <a href="#" className="text-md text-blue-base">
                brev.ly
              </a>
              .
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
