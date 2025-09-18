import { createLink } from "@/api/createLink";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";

const formSchema = z.object({
  url: z.url("Informe uma URL válida."),
  alias: z
    .string()
    .regex(
      /^[a-z0-9-]+$/,
      "Informe uma URL minúscula e sem espaço/caracter especial."
    ),
});

type TLinkForm = z.infer<typeof formSchema>;

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<TLinkForm>({
    resolver: zodResolver(formSchema),
  });

  const { mutateAsync: createLinkFn } = useMutation({
    mutationFn: createLink,
  });

  async function handleSaveLink(formData: TLinkForm) {
    try {
      await createLinkFn({
        url: formData.url,
        alias: formData.alias,
      });
      reset();
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error("Erro no cadastro", {
          description: error.response?.data.message,
        });
      } else {
        toast.error(`Erro ao cadastrar URL encurtada.`);
      }
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Novo link</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          className="flex flex-col gap-4 sm:min-w-[19.75rem]"
          onSubmit={handleSubmit(handleSaveLink)}
        >
          <Input
            id="url"
            label="link original"
            placeholder="www.exemplo.com.br"
            {...register("url")}
            error={errors.url?.message}
          />
          <Input
            id="alias"
            label="link encurtado"
            prefix="brev.ly/"
            {...register("alias")}
            error={errors.alias?.message}
          />
          <Button disabled={isSubmitting}>Salvar link</Button>
        </form>
      </CardContent>
    </Card>
  );
}
