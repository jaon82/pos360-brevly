import { isLeft, unwrapEither } from "@/infra/shared/either";
import { incrementLinkViews } from "@/services/increment-link-views";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const incrementLinkViewsRoute: FastifyPluginAsyncZod = async (
  server
) => {
  server.patch(
    "/links/:id/views",
    {
      schema: {
        summary: "Increment link views by ID",
        tags: ["Links"],
        params: z.object({
          id: z
            .string()
            .describe("ID of the link to have the number of views incremented"),
        }),
        response: {
          204: z.object({}),
          404: z
            .object({ message: z.string(), errors: z.any().optional() })
            .describe("Resource not found"),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const result = await incrementLinkViews(id);
      if (isLeft(result)) {
        const error = unwrapEither(result);
        switch (error.constructor.name) {
          case "NotFoundError":
            return reply.status(404).send({ message: error.message });
        }
      } else {
        return reply.status(204).send();
      }
    }
  );
};
