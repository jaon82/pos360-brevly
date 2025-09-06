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
        tags: ["url_shortener"],
        body: z.object({
          originalUrl: z.url().describe("The URL to be shortened"),
          shortUrl: z.url().describe("The shortened URL"),
        }),
        response: {
          201: z
            .object({
              urlId: z.uuid().describe("The ID of the created URL"),
              shortUrl: z.url().describe("The shortened URL"),
              originalUrl: z.url().describe("The original URL"),
            })
            .describe("Link created successfully"),
          400: z
            .object({ message: z.string(), errors: z.any().optional() })
            .describe("Validation error"),
          409: z.object({ message: z.string() }).describe("URL already exists"),
        },
      },
    },
    async (request, reply) => {
      const { originalUrl, shortUrl } = request.body;
      const result = await createLink({ originalUrl, shortUrl });
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
