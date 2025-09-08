import { isLeft, unwrapEither } from "@/infra/shared/either";
import { createLink } from "@/services/create-link";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const createLinkRoute: FastifyPluginAsyncZod = async (server) => {
  server.post(
    "/links",
    {
      schema: {
        summary: "Create a short URL from an original one",
        tags: ["Links"],
        body: z.object({
          url: z.url().describe("The URL to be shortened"),
          alias: z.string().describe("The URL alias"),
        }),
        response: {
          201: z
            .object({
              id: z.uuid().describe("The ID of the created URL"),
              alias: z.string().describe("The URL alias"),
              url: z.url().describe("The original URL"),
            })
            .describe("Link created successfully"),
          400: z
            .object({ message: z.string(), errors: z.any().optional() })
            .describe("Validation error"),
          409: z
            .object({ message: z.string() })
            .describe("URL alias already exists"),
        },
      },
    },
    async (request, reply) => {
      const { url, alias } = request.body;
      const result = await createLink({ url, alias });
      if (isLeft(result)) {
        const error = unwrapEither(result);
        switch (error.constructor.name) {
          case "ExistingLinkError":
            return reply.status(400).send({ message: error.message });
        }
      } else {
        const newLink = unwrapEither(result);
        return reply.status(201).send(newLink);
      }
    }
  );
};
