import { deleteLink } from "@/api/deletetLink";
import type { LinksResponse } from "@/interfaces/links";
import { CopyIcon, TrashIcon } from "@phosphor-icons/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { Link } from "react-router";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

interface LinkCardProps {
  linkData: LinksResponse;
}
export default function LinkCard({ linkData }: LinkCardProps) {
  const queryClient = useQueryClient();

  const { mutateAsync: deleteLinkFn } = useMutation({
    mutationFn: deleteLink,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["get-links"] });
    },
  });

  async function handleDelete(id: string) {
    try {
      await deleteLinkFn(id);
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error("Erro ao excluir", {
          description: error.response?.data.message,
        });
      } else {
        toast.error(`Erro ao excluir URL encurtada.`);
      }
    }
  }

  return (
    <>
      <Separator className="mb-3" />
      <div className="grid grid-cols-4 gap-4 items-center py-0.5">
        <div className="flex flex-col gap-1 col-span-2">
          <span className="text-md text-blue-base">
            <Link to={`/${linkData.alias}`} target="_blank">
              brev.ly/{linkData.alias}
            </Link>
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
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="secondary" size="sm">
                <TrashIcon />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Remover link</AlertDialogTitle>
                <AlertDialogDescription>
                  Você realmente quer apagar o link "{linkData.alias}"?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={() => handleDelete(linkData.id)}>
                  Confirmar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </>
  );
}
