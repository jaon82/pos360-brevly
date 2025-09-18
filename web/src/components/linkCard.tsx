import type { LinksResponse } from "@/interfaces/links";
import { CopyIcon, TrashIcon } from "@phosphor-icons/react";
import { Link } from "react-router";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

interface LinkCardProps {
  linkData: LinksResponse;
}
export default function LinkCard({ linkData }: LinkCardProps) {
  return (
    <>
      <Separator className="mb-3" />
      <div className="grid grid-cols-4 gap-4 items-center py-0.5">
        <div className="flex flex-col gap-1 col-span-2">
          <span className="text-md text-blue-base">
            <Link to={`/${linkData.alias}`}>brev.ly/{linkData.alias}</Link>
          </span>
          <span className="text-sm text-gray-500 font-normal h-4 overflow-hidden overflow-ellipsis">
            {linkData.url}
          </span>
        </div>
        <div className="text-sm text-gray-500 font-normal">
          {`${linkData.views} ${linkData.views > 1 ? "acessos" : "acesso"}`}
        </div>
        <div className="flex gap-1">
          <Button variant="secondary" size="sm">
            <CopyIcon />
          </Button>
          <Button variant="secondary" size="sm">
            <TrashIcon />
          </Button>
        </div>
      </div>
    </>
  );
}
