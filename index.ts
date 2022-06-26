import { WebSocketServer } from 'ws';
import httpServer from './src/http_server/index';
import { MOUSE_POSITION } from './src/const';
import {
  showHttpServerStart, showWsClosed, showWsConnected, showWssParams, showWssStart,
} from './src/notifications/notifications';
import Handler from './src/commandHandlers.ts/commandHandler';
import isCommandValid from './src/utils.ts/isCommandValid';

const HTTP_PORT = 3000;
const WSS_PORT = 8080;

showHttpServerStart(HTTP_PORT);
httpServer.listen(HTTP_PORT);

const wss = new WebSocketServer({ port: WSS_PORT });
showWssStart(WSS_PORT);

wss.on('headers', (headers) => {
  showWssParams(headers);
});

wss.on('connection', (ws) => {
  showWsConnected();

  const handler = new Handler(ws as unknown as WebSocket);

  ws.on('message', (data) => {
    const [command, ...args] = data.toString().split(' ');

    if (isCommandValid(command)) {
      if (args) {
        handler[command as keyof typeof handler](args);
      } else {
        handler[command as typeof MOUSE_POSITION]();
      }
    } else {
      ws.send('Invalid command');
      console.log('Invalid command');
    }
  });

  ws.on('close', () => {
    showWsClosed();
  });
});
