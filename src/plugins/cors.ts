import fp from 'fastify-plugin';
import cors from '@fastify/cors';
import { FastifyInstance } from 'fastify';

const init = (fastify: FastifyInstance) => {
  fastify.register(cors, {});
};

export default fp(init);
