import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { Either, makeLeft, makeRight } from "@/infra/shared/either";
import { eq } from "drizzle-orm";
import { ExistingLinkError } from "./errors/existing-link";
import { NotFoundError } from "./errors/not-found";

export async function deleteLink(
  id: string
): Promise<Either<ExistingLinkError, null>> {
  //Verificar se o link existe na base de dados
  const existingLink = await db.query.links.findFirst({
    where: (links, { eq }) => eq(links.id, id),
  });
  if (!existingLink) {
    return makeLeft(new NotFoundError());
  }
  //Apaga o link da base de dados
  await db.delete(schema.links).where(eq(schema.links.id, id));
  return makeRight(null);
}
