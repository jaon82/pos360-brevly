import { isLeft, unwrapEither } from "@/infra/shared/either";
import { getLink } from "@/services/get-link";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const getLinkRoute: FastifyPluginAsyncZod = async (server) => {
  server.get(
    "/links/:alias",
    {
      schema: {
        summary: "Get link by alias",
        tags: ["link"],
        params: z.object({
          alias: z.string(),
        }),
        response: {
          200: z.object({
            id: z.string(),
            url: z.url(),
          }),
          404: z.object({ message: z.string() }).describe("Resource not found"),
        },
      },
    },
    async (request, reply) => {
      const { alias } = request.params;
      const result = await getLink({
        alias,
      });
      if (isLeft(result)) {
        const error = unwrapEither(result);
        switch (error.constructor.name) {
          case "NotFoundError":
            return reply.status(404).send({ message: error.message });
        }
      } else {
        const link = unwrapEither(result);
        return reply.status(200).send(link);
      }
    }
  );
};
