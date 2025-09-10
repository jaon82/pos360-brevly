import { unwrapEither } from "@/infra/shared/either";
import { exportLinks } from "@/services/export-links";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const exportLinksRoute: FastifyPluginAsyncZod = async (server) => {
  server.get(
    "/links/exports",
    {
      schema: {
        summary: "Export links",
        tags: ["Links"],
        response: {
          200: z.object({
            reportUrl: z.url(),
          }),
        },
      },
    },
    async (request, reply) => {
      const result = await exportLinks();
      const { reportUrl } = unwrapEither(result);
      return reply.status(200).send({ reportUrl });
    }
  );
};
