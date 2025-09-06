import { isLeft, unwrapEither } from "@/infra/shared/either";
import { deleteLink } from "@/services/delete-link";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const deleteLinkRoute: FastifyPluginAsyncZod = async (server) => {
  server.delete(
    "/links/:id",
    {
      schema: {
        summary: "Delete a link by ID",
        tags: ["url_shortener"],
        params: z.object({
          id: z.string().describe("ID of the link to be deleted"),
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
      const result = await deleteLink(id);
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
