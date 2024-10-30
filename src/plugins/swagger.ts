import fp from 'fastify-plugin';
import swagger from '@fastify/swagger';
import ui from '@fastify/swagger-ui';
import { FastifyInstance } from 'fastify';

const init = (fastify: FastifyInstance) => {
  fastify.register(swagger, {
    swagger: {
      info: {
        title: 'api.docs',
        version: '1.0.0'
      }
    }
  });

  fastify.register(ui, {
    routePrefix: '/docs'
  });
};

export default fp(init);
