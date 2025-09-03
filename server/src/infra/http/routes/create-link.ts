//import { uploadImage } from "@/app/functions/upload-image";
//import { isRight, unwrapEither } from "@/infra/shared/either";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const createLinkRoute: FastifyPluginAsyncZod = async (server) => {
  server.post(
    "/urls",
    {
      schema: {
        summary: "Create a short URL from an original one",
        tags: ["url_shortener"],
        body: z.object({
          original_url: z.url().describe("The URL to be shortened"),
          short_url: z.url().describe("The shortened URL"),
        }),
        response: {
          201: z
            .object({
              urlId: z.uuid().describe("The ID of the created URL"),
              shortUrl: z.url().describe("The shortened URL"),
              originalUrl: z.url().describe("The original URL"),
            })
            .describe("Link created successfully"),
          400: z.object({ message: z.string() }),
          409: z.object({ message: z.string() }).describe("URL already exists"),
        },
      },
    },
    async (request, reply) => {
      return reply.status(201).send({
        urlId: "123e4567-e89b-12d3-a456-426614174000",
        shortUrl: "http://brev.ly/abcd1234",
        originalUrl: "http://example.com/some/very/long/url",
      });
    }
  );
};
