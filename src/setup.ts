import { join } from 'path';

import Fastify, { FastifyInstance } from 'fastify';

import autoload from '@fastify/autoload';

interface Options {
  logger?: boolean;
}

export const buildServer = (
  options: Options = {
    logger: true
  }
) => {
  const server: FastifyInstance = Fastify({
    logger: options.logger
  });

  server.register(autoload, {
    dir: join(__dirname, 'plugins')
  });

  server.register(autoload, {
    dir: join(__dirname, 'routes'),
    routeParams: true
  });

  return server;
};
