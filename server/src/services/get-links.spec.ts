import { unwrapEither } from "@/infra/shared/either";
import { makeLink } from "@/test/factories/make-link";
import { describe, expect, it } from "vitest";
import { getLinks } from "./get-links";

describe("Get links", () => {
  it("should be able to get stored links", async () => {
    const link1 = await makeLink();
    const link2 = await makeLink();
    const link3 = await makeLink();
    const link4 = await makeLink();
    const result = await getLinks();
    const sut = unwrapEither(result);
    expect(sut.length).greaterThan(0);
    expect(sut).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: link1.id }),
        expect.objectContaining({ id: link2.id }),
        expect.objectContaining({ alias: link3.alias }),
        expect.objectContaining({ alias: link4.alias }),
      ])
    );
  });
});
