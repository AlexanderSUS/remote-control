import robot from 'robotjs';
import { WebSocketServer } from 'ws';
import httpServer from './src/http_server/index';
import {
  DRAW_CIRCLE,
  DRAW_RECTANGLE,
  DRAW_SQUARE,
  MOUSE_DOWN, MOUSE_LEFT, MOUSE_POSITION, MOUSE_RIGHT, MOUSE_UP, PRINT_SCREEN,
} from './src/const';
import { Mouse } from './src/types/mouse';
import {
  moveMouseDown, moveMouseLeft, moveMouseRight, moveMouseUp,
} from './src/move/move';
import drawSquare from './src/draw/drawSqueare';
import drawRectangle from './src/draw/drawRectangle';
import drawCircle from './src/draw/drawCircle';
// import getScreenshot from './src/screenshot/getScreenshot';

const HTTP_PORT = 3000;
const WSS_PORT = 8080;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const wss = new WebSocketServer({ port: WSS_PORT });
console.log(`WS server in running on the ${WSS_PORT} port!`);

wss.on('headers', (headers) => {
  console.log('WSS parameters:\n', headers.join('\n'));
});

wss.on('connection', (ws) => {
  console.log('WebSocket connected');

  const mouse: Mouse = robot.getMousePos();

  ws.on('message', (data) => {
    const [command, ...args] = data.toString().split(' ');

    switch (command) {
      case MOUSE_POSITION:
        ws.send(`${MOUSE_POSITION} ${mouse.x},${mouse.y}\0`);
        break;
      case MOUSE_UP:
        moveMouseUp(mouse, +args);
        ws.send(`${MOUSE_POSITION} ${mouse.x},${mouse.y}}\0`);
        break;
      case MOUSE_DOWN:
        moveMouseDown(mouse, +args);
        ws.send(`${MOUSE_POSITION} ${mouse.x},${mouse.y}}\0`);
        break;
      case MOUSE_LEFT:
        moveMouseLeft(mouse, +args);
        ws.send(`${MOUSE_POSITION} ${mouse.x},${mouse.y}}\0`);
        break;
      case MOUSE_RIGHT:
        moveMouseRight(mouse, +args);
        ws.send(`${MOUSE_POSITION} ${mouse.x},${mouse.y}}\0`);
        break;
      case DRAW_CIRCLE:
        drawCircle(+args);
        ws.send(`${DRAW_RECTANGLE}\0`);
        break;
      case DRAW_SQUARE:
        ws.send(`${DRAW_SQUARE}\0`);
        drawSquare(+args);
        return;
      case DRAW_RECTANGLE:
        ws.send(`${DRAW_RECTANGLE}\0`);
        drawRectangle(args.map((arg) => +arg));
        break;
      case PRINT_SCREEN:
        // getScreenshot(ws as unknown as WebSocket);
        break;
      default:
        return;
    }
    console.log(command);
    console.log(`${MOUSE_POSITION} ${mouse.x},${mouse.y}`);
  });

  ws.on('close', () => {
    console.log('WebSocket connection closed');
  });
});
