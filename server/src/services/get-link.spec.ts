import { isRight, unwrapEither } from "@/infra/shared/either";
import { randomUUID } from "node:crypto";
import { describe, expect, it } from "vitest";
import { createLink } from "./create-link";
import { getLink } from "./get-link";

describe("Get link by alias", () => {
  it("should be able to get a link by short url", async () => {
    const alias = randomUUID();
    const newLink = {
      url: `http://${randomUUID()}.com`,
      alias,
    };
    await createLink(newLink);
    const sut = await getLink({
      alias,
    });
    expect(isRight(sut)).toBe(true);
    expect(unwrapEither(sut)).toHaveProperty("url");
  });
});
