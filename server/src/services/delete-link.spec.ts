import { isRight, unwrapEither } from "@/infra/shared/either";
import { randomUUID } from "node:crypto";
import { describe, expect, it } from "vitest";
import { createLink } from "./create-link";
import { deleteLink } from "./delete-link";
import { NotFoundError } from "./errors/not-found";
import { getLink } from "./get-link";

describe("Delete link", () => {
  it("should be able to delete a link by its id", async () => {
    const alias = randomUUID();
    const newLink = {
      url: `http://${randomUUID()}.com`,
      alias,
    };
    const result = await createLink(newLink);
    expect(isRight(result)).toBe(true);
    if (isRight(result)) {
      const createdLink = unwrapEither(result);
      await deleteLink(createdLink.id);
      const sut = await getLink({
        alias: createdLink.alias,
      });
      expect(unwrapEither(sut)).toBeInstanceOf(NotFoundError);
    }
  });
  it("should not be able to delete a link with an existent id", async () => {
    const alias = randomUUID();
    const newLink = {
      url: `http://${randomUUID()}.com`,
      alias,
    };
    const result = await createLink(newLink);
    expect(isRight(result)).toBe(true);
    if (isRight(result)) {
      const sut = await deleteLink("non-existent-id");
      expect(unwrapEither(sut)).toBeInstanceOf(NotFoundError);
    }
  });
});
