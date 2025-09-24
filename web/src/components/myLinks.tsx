import { downloadLinks } from "@/api/downloadLinks";
import { getLinks } from "@/api/getLinks";
import {
  DownloadSimpleIcon,
  LinkIcon,
  SpinnerIcon,
} from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import LinkCard from "./linkCard";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";

export default function MyLinks() {
  const {
    data: linksData,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["get-links"],
    queryFn: getLinks,
  });

  const handleDownload = async () => {
    const exportLink = await downloadLinks();
    window.open(exportLink.reportUrl, "_blank");
  };

  return (
    <Card className="sm:flex-1 gap-4 mb-4 min-h-80 relative">
      {isLoading && (
        <div className="w-full absolute top-0 left-0 overflow-hidden">
          <Progress value={20} className="h-1 animate-loading" />
        </div>
      )}
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Meus links</span>
          <Button
            variant="secondary"
            size="sm"
            disabled={linksData?.length === 0}
            onClick={handleDownload}
          >
            <DownloadSimpleIcon />
            Baixar CSV
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent
        className={`flex flex-col gap-3 ${
          isLoading
            ? "h-full"
            : "overflow-y-auto max-h-[19rem] md:max-h-[calc(100dvh-13rem)]"
        }`}
      >
        {isSuccess && linksData && linksData.length > 0 ? (
          linksData.map((link) => <LinkCard key={link.id} linkData={link} />)
        ) : isLoading ? (
          <div className="flex flex-col flex-1 gap-2 justify-center items-center">
            <SpinnerIcon size={32} className="animate-spin" />
            <div className="text-xs text-gray-500 uppercase">
              carregando links...
            </div>
          </div>
        ) : (
          <>
            <Separator className="mb-4" />
            <div className="flex flex-col gap-3 items-center pb-6 pt-4">
              <LinkIcon className="text-[2rem] text-gray-400" />
              <div className="text-xs text-gray-500 uppercase">
                ainda não existem links cadastrados
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
