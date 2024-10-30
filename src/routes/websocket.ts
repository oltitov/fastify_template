import { FastifyInstance, FastifyRequest } from 'fastify';
import { WebSocket, RawData } from 'ws';
import type { ParamsSchema } from '../types/websocket';
import websocketRoomSchema from '@schemas/websocket.json';

export default (fastify: FastifyInstance) => {
  fastify.get<ParamsSchema>(
    '/websocket/:room',
    {
      websocket: true,
      schema: websocketRoomSchema.get,
      preValidation: [fastify.websocketRooms]
    },
    async (connection: WebSocket, req: FastifyRequest<ParamsSchema>) => {
      const roomKey = req.params.room;

      if (!req.RoomConnections[roomKey]) {
        req.RoomConnections[roomKey] = new Set();
      }

      req.RoomConnections[roomKey].add(connection);

      connection.on('message', (message: RawData) => {
        if (message.toString() === '') {
          return;
        }

        if (message.toString().toLowerCase() === 'ping') {
          connection.send('pong');
        }

        req.RoomConnections![roomKey].forEach((client: WebSocket) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(`Message to /websocket/${roomKey} clients: ${message}`);
          }
        });
      });

      connection.on('close', () => {
        req.RoomConnections![roomKey].delete(connection);

        if (req.RoomConnections![roomKey].size === 0) {
          delete req.RoomConnections![roomKey];
        }
      });
    }
  );
};
