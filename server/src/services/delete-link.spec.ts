import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { unwrapEither } from "@/infra/shared/either";
import { makeLink } from "@/test/factories/make-link";
import { eq } from "drizzle-orm";
import { randomUUID } from "node:crypto";
import { describe, expect, it } from "vitest";
import { deleteLink } from "./delete-link";
import { NotFoundError } from "./errors/not-found";

describe("Delete link", () => {
  it("should be able to delete a link by its id", async () => {
    const alias = randomUUID();
    const newLink = await makeLink({ alias });
    await deleteLink(newLink.id);
    const result = await db
      .select()
      .from(schema.links)
      .where(eq(schema.links.alias, newLink.alias));
    expect(result).toHaveLength(0);
  });
  it("should not be able to delete a link with an existent id", async () => {
    await makeLink();
    const sut = await deleteLink("non-existent-id");
    expect(unwrapEither(sut)).toBeInstanceOf(NotFoundError);
  });
});
