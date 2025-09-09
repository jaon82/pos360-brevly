import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { makeLink } from "@/test/factories/make-link";
import { eq } from "drizzle-orm";
import { describe, expect, it } from "vitest";
import { incrementLinkViews } from "./increment-link-views";

describe("Increment link views", () => {
  it("should be able to increment a link views", async () => {
    const newLink = await makeLink();
    await incrementLinkViews(newLink.id);
    const result = await db
      .select()
      .from(schema.links)
      .where(eq(schema.links.id, newLink.id));
    expect(result).toHaveLength(1);
    expect(result[0].views).toBe(newLink.views + 1);

    const otherLink = await makeLink();
    await incrementLinkViews(otherLink.id);
    await incrementLinkViews(otherLink.id);
    await incrementLinkViews(otherLink.id);
    const result2 = await db
      .select()
      .from(schema.links)
      .where(eq(schema.links.id, otherLink.id));
    expect(result2).toHaveLength(1);
    expect(result2[0].views).toBe(otherLink.views + 3);
  });
});
