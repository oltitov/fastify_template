import { AddressInfo } from 'node:net';
import { buildServer } from '../src/setup';

export async function build(tap) {
  const server = buildServer({
    logger: false
  });

  await server.listen({ port: 0 });

  tap.teardown(() => {
    server.close();
  });

  return {
    server,
    baseUrl: `http://127.0.0.1:${(server.server.address() as AddressInfo).port}`,
    wsBaseUrl: `ws://127.0.0.1:${(server.server.address() as AddressInfo).port}`
  };
}
