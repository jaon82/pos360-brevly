import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { type Either, makeRight } from "@/infra/shared/either";
import { desc } from "drizzle-orm";

type GetLinksOutput = {
  id: string;
  url: string;
  alias: string;
  views: number;
}[];

export async function getLinks(): Promise<Either<never, GetLinksOutput>> {
  const links = await db
    .select({
      id: schema.links.id,
      url: schema.links.url,
      alias: schema.links.alias,
      views: schema.links.views,
    })
    .from(schema.links)
    .orderBy((fields) => {
      return desc(fields.id);
    });
  return makeRight(links);
}
