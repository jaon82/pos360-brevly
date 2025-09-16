import { DownloadSimpleIcon, LinkIcon } from "@phosphor-icons/react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";

export default function MyLinks() {
  return (
    <Card className="sm:flex-1">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Meus links</span>
          <Button variant="secondary" size="sm" disabled>
            <DownloadSimpleIcon />
            Baixar CSV
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Separator className="mb-4" />
        <div className="flex flex-col gap-3 items-center pb-6 pt-4">
          <LinkIcon className="text-[2rem] text-gray-400" />
          <div className="text-xs text-gray-500 uppercase">
            ainda não existem links cadastrados
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
