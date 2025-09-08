import { unwrapEither } from "@/infra/shared/either";
import { getLinks } from "@/services/get-links";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const getLinksRoute: FastifyPluginAsyncZod = async (server) => {
  server.get(
    "/links",
    {
      schema: {
        summary: "Get links",
        tags: ["Links"],
        response: {
          200: z.array(
            z.object({
              id: z.string(),
              url: z.url(),
              alias: z.string(),
              views: z.number(),
            })
          ),
        },
      },
    },
    async (request, reply) => {
      const result = await getLinks();
      const links = unwrapEither(result);
      return reply.status(200).send(links);
    }
  );
};
