import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { Either, makeLeft, makeRight } from "@/infra/shared/either";
import z from "zod";
import { ExistingLinkError } from "./errors/existing-link";

const createLinkInput = z.object({
  originalUrl: z.url(),
  shortUrl: z.url(),
});

type CreateLinkInput = z.input<typeof createLinkInput>;

interface CreateLinkOutput {
  urlId: string;
  shortUrl: string;
  originalUrl: string;
}

export async function createLink(
  input: CreateLinkInput
): Promise<Either<ExistingLinkError, CreateLinkOutput>> {
  const { originalUrl, shortUrl } = createLinkInput.parse(input);
  //Verificar se shortUrl já existe na base de dados
  const existingLink = await db.query.links.findFirst({
    where: (links, { eq }) => eq(links.shortUrl, shortUrl),
  });
  if (existingLink) {
    return makeLeft(new ExistingLinkError());
  }
  //Criar o novo link
  const newLink = await db
    .insert(schema.links)
    .values({
      originalUrl,
      shortUrl,
    })
    .returning();
  //Retornar os dados do novo link
  return makeRight({
    urlId: newLink[0].id,
    shortUrl: newLink[0].shortUrl,
    originalUrl: newLink[0].originalUrl,
  });
}
