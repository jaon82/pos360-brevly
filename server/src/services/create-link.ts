import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { Either, makeLeft, makeRight } from "@/infra/shared/either";
import z from "zod";
import { ExistingLinkError } from "./errors/existing-link";

const createLinkInput = z.object({
  url: z.url(),
  alias: z.string(),
});

type CreateLinkInput = z.input<typeof createLinkInput>;

interface CreateLinkOutput {
  id: string;
  alias: string;
  url: string;
}

export async function createLink(
  input: CreateLinkInput
): Promise<Either<ExistingLinkError, CreateLinkOutput>> {
  const { url, alias } = createLinkInput.parse(input);
  //Verificar se alias já existe na base de dados
  const existingLink = await db.query.links.findFirst({
    where: (links, { eq }) => eq(links.alias, alias),
  });
  if (existingLink) {
    return makeLeft(new ExistingLinkError());
  }
  //Criar o novo link
  const newLink = await db
    .insert(schema.links)
    .values({
      url,
      alias,
    })
    .returning();
  //Retornar os dados do novo link
  return makeRight({
    id: newLink[0].id,
    alias: newLink[0].alias,
    url: newLink[0].url,
  });
}
