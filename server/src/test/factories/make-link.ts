import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { fakerPT_BR as faker } from "@faker-js/faker";
import type { InferInsertModel } from "drizzle-orm";
import { randomUUID } from "node:crypto";

export async function makeLink(
  overrides?: Partial<InferInsertModel<typeof schema.links>>
) {
  const result = await db
    .insert(schema.links)
    .values({
      url: faker.internet.url(),
      alias: randomUUID(),
      ...overrides,
    })
    .returning();
  return result[0];
}
