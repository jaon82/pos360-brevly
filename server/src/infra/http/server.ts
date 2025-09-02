import fastifyCors from "@fastify/cors";
import fastify from "fastify";

const server = fastify();

server.register(fastifyCors, { origin: "*" });

server.get("/", async () => {
  return { hello: "world" };
});

server
  .listen({ port: 3333, host: "0.0.0.0" })
  .then(() => {
    console.log("HTTP Server running!");
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
