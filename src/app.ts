import { buildServer } from './setup';

(async () => {
  const server = buildServer();

  try {
    await server.listen({ port: 3000 });

    const address = server.server.address();
    const port = typeof address === 'string' ? address : address?.port;

    console.log(`listen for ${port} port`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
})();
