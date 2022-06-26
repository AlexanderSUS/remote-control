import { WebSocketServer, createWebSocketStream } from 'ws';
import httpServer from './src/http_server/index';
import {
  showHttpServerStart, showWsClosed, showWsConnected, showWssParams, showWssStart,
} from './src/notifications/notifications';
import Handler from './src/commandHandlers.ts/commandHandler';
import isCommandValid from './src/utils.ts/isCommandValid';
import isMousePosOrPrintScrn from './src/utils.ts/isMousePosOrPrntScrn';
import { FAIL_INVALID_COMMAND, INVALID_COMMAND } from './src/const';

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

  const duplex = createWebSocketStream(ws, { encoding: 'utf-8' });
  duplex.pipe(process.stdout);

  const handler = new Handler(duplex);

  duplex.on('data', (data) => {
    const [command, ...args] = data.toString().split(' ');

    if (isCommandValid(command)) {
      if (isMousePosOrPrintScrn(command)) {
        handler[command]();
      } else {
        handler[command](args);
      }
    } else {
      duplex._write(INVALID_COMMAND, 'utf-8', (err) => console.error(err));
      process.stdout.write(`${FAIL_INVALID_COMMAND}${command}\n`);
    }
  });

  ws.on('close', () => {
    showWsClosed();
  });
});
