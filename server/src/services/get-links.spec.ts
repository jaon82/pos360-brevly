import { unwrapEither } from "@/infra/shared/either";
import { randomUUID } from "node:crypto";
import { describe, expect, it } from "vitest";
import { createLink } from "./create-link";
import { getLinks } from "./get-links";

describe("Get links", () => {
  it("should be able to get stored links", async () => {
    const alias = randomUUID();
    const newLink = {
      url: `http://${randomUUID()}.com`,
      alias,
    };
    await createLink(newLink);
    const result = await getLinks();
    const sut = unwrapEither(result);
    expect(sut.length).greaterThan(0);
    expect(sut).toEqual(
      expect.arrayContaining([expect.objectContaining({ alias })])
    );
  });
});
