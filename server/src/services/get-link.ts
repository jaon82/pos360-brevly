import { db } from "@/infra/db";
import { type Either, makeLeft, makeRight } from "@/infra/shared/either";
import { z } from "zod";
import { NotFoundError } from "./errors/not-found";

const getLinkInput = z.object({
  alias: z.string(),
});
type GetLinkInput = z.input<typeof getLinkInput>;
type GetLinkOutput = {
  id: string;
  url: string;
};

export async function getLink(
  input: GetLinkInput
): Promise<Either<NotFoundError, GetLinkOutput>> {
  const { alias } = getLinkInput.parse(input);
  const link = await db.query.links.findFirst({
    columns: {
      id: true,
      url: true,
    },
    where(fields, { eq, and }) {
      return and(eq(fields.alias, alias));
    },
  });
  if (!link) {
    return makeLeft(new NotFoundError());
  }
  return makeRight(link);
}
