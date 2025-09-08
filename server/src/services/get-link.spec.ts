import { isRight, unwrapEither } from "@/infra/shared/either";
import { makeLink } from "@/test/factories/make-link";
import { randomUUID } from "node:crypto";
import { describe, expect, it } from "vitest";
import { getLink } from "./get-link";

describe("Get link by alias", () => {
  it("should be able to get a link by short url", async () => {
    const alias = randomUUID();
    const newLink = await makeLink({ alias });
    const result = await getLink({
      alias,
    });
    expect(isRight(result)).toBe(true);
    if (isRight(result)) {
      const sut = unwrapEither(result);
      expect(sut.url).toBe(newLink.url);
    }
  });
});
