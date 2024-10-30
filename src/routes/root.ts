import schema from '@schemas/root.json';
import { FastifyInstance } from 'fastify';

export default (fastify: FastifyInstance) => {
  fastify.get('/ping', { schema }, async () => {
    return { pong: 'it worked!' };
  });
};
