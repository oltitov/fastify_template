import tap from 'tap';
import { build } from './helper';
import WebSocket from 'ws';
import { once } from 'node:events';

tap.test('ping', async (t) => {
  const { baseUrl } = await build(t);
  const responce = await fetch(`${baseUrl}/ping`);
  const json = await responce.json();

  t.same(json.pong, 'it worked!');
});

tap.test('webosocket', async (t) => {
  const { wsBaseUrl } = await build(t);

  const wsUrl = `${wsBaseUrl}/websocket/test-room`;

  const ws = new WebSocket(wsUrl);

  await once(ws, 'open');
  const chunkPromise = once(ws, 'message');

  ws.send('ping');

  const [chunk] = await chunkPromise;
  t.equal(chunk.toString(), 'pong');
  ws.close();
});
