import 'fastify';
import type WebSocket from 'ws';

export interface RoomConnections {
  [roomKey: string]: Set<WebSocket>;
}

export type ParamsSchema = { Params: { room: string } };

declare module 'fastify' {
  interface FastifyInstance {
    websocketRooms: (req: FastifyRequest) => Promise<void>;
  }

  interface FastifyRequest {
    RoomConnections: RoomConnections;
  }
}
