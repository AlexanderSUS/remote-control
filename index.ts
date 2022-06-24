// import Jimp from 'jimp';
import robot from 'robotjs';
import { WebSocketServer } from 'ws';
import httpServer from './src/http_server/index';
import {
  // DRAW_CIRCLE,
  // DRAW_RECTANGLE,
  // DRAW_SQUARE,
  MOUSE_DOWN, MOUSE_LEFT, MOUSE_POSITION, MOUSE_RIGHT, MOUSE_UP,
} from './src/const';
import { Mouse } from './src/types/mouse';
import {
  moveMouseDown, moveMouseLeft, moveMouseRight, moveMouseUp,
} from './src/move/move';
// import drawSquare from './src/draw/drawSqueare';
// import drawRectangle from './src/draw/drawRectangle';

const HTTP_PORT = 3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('connected');

  const mouse: Mouse = robot.getMousePos();

  ws.on('message', (data) => {
    console.log(data.toString());

    const [command, ...args] = data.toString().split(' ');

    switch (command) {
      case MOUSE_POSITION:
        break;
      case MOUSE_UP:
        moveMouseUp(mouse, +args);
        ws.send(`${MOUSE_POSITION} ${mouse.x},${mouse.y}}`);
        break;
      case MOUSE_DOWN:
        moveMouseDown(mouse, +args);
        ws.send(`${MOUSE_POSITION} ${mouse.x},${mouse.y}}`);
        break;
      case MOUSE_LEFT:
        moveMouseLeft(mouse, +args);
        ws.send(`${MOUSE_POSITION} ${mouse.x},${mouse.y}}`);
        break;
      case MOUSE_RIGHT:
        moveMouseRight(mouse, +args);
        ws.send(`${MOUSE_POSITION} ${mouse.x},${mouse.y}}`);
        break;
        // case DRAW_CIRCLE:
        // ws.send(DRAW_RECTANGLE);
        // break;
      // case DRAW_SQUARE:
      //   ws.send(DRAW_SQUARE);
      //   drawSquare(+args);
      //   return;
      // case DRAW_RECTANGLE:
      //   ws.send(DRAW_RECTANGLE);
      //   const [shiftX, shiftY] = args;
      //   drawRectangle(+shiftX, +shiftY);
      //   break;
      default:
        console.log('Unknown command', command, args);
    }

    console.log(`${MOUSE_POSITION} ${mouse.x},${mouse.y}`);
  });
});
