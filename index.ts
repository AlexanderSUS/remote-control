/* eslint-disable no-case-declarations */
// import Jimp from 'jimp';
import robot from 'robotjs';
import { WebSocketServer } from 'ws';
import httpServer from './src/http_server/index';
import {
  MOUSE_DOWN, MOUSE_LEFT, MOUSE_POSITION, MOUSE_RIGHT, MOUSE_UP,
} from './src/http_server/const';
import { Mouse } from './src/http_server/types/mouse';

const HTTP_PORT = 3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('connected');

  const mouse: Mouse = robot.getMousePos();

  console.log(mouse);

  ws.on('message', (data) => {
    console.log(data.toString());

    const [command, args] = data.toString().split(' ');

    switch (command) {
      case MOUSE_POSITION:
        break;
      case MOUSE_UP:
        mouse.y -= +args;
        break;
      case MOUSE_DOWN:
        mouse.y += +args;
        break;
      case MOUSE_LEFT:
        mouse.x -= +args;
        break;
      case MOUSE_RIGHT:
        mouse.x += +args;
        break;

      default:
        console.log('Unknown command', command, args);
    }

    robot.moveMouse(mouse.x, mouse.y);
    ws.send(`${MOUSE_POSITION} ${mouse.y},${mouse.x}}`);
  });
});
