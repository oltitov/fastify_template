import fp from 'fastify-plugin';
import websocket from '@fastify/websocket';
import { FastifyInstance, FastifyPluginCallback, FastifyRequest } from 'fastify';

const init: FastifyPluginCallback = (fastify: FastifyInstance) => {
  const RoomConnections = {};

  fastify.decorate('websocketRooms', async (req: FastifyRequest) => {
    req.RoomConnections = RoomConnections;
  });

  fastify.register(websocket, {
    options: {
      maxPayload: 1048576,
      clientTracking: true
    }
  });
};

export default fp(init);
