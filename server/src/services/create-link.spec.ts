import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { isLeft, isRight, unwrapEither } from "@/infra/shared/either";
import { eq } from "drizzle-orm";
import { randomUUID } from "node:crypto";
import { describe, expect, it } from "vitest";
import { createLink } from "./create-link";
import { ExistingLinkError } from "./errors/existing-link";

describe("Create link", () => {
  it("should be able to create a link", async () => {
    const newLink = {
      url: `http://${randomUUID()}.com`,
      alias: `http://brev.ly/${randomUUID()}`,
    };
    const sut = await createLink(newLink);
    expect(isRight(sut)).toBe(true);
    const result = await db
      .select()
      .from(schema.links)
      .where(eq(schema.links.alias, newLink.alias));
    expect(result).toHaveLength(1);
  });

  it("should not be able to create an existing short URL", async () => {
    const alias = `http://brev.ly/${randomUUID()}`;
    const newLink = {
      url: `http://${randomUUID()}.com`,
      alias,
    };
    await createLink(newLink);
    const sut = await createLink({
      url: `http://${randomUUID()}.com`,
      alias,
    });
    expect(isLeft(sut)).toBe(true);
    expect(unwrapEither(sut)).toBeInstanceOf(ExistingLinkError);
  });
});
