import robot from 'robotjs';
import internal from 'stream';
import {
  DRAW_CIRCLE,
  DRAW_RECTANGLE,
  DRAW_SQUARE,
  MOUSE_DOWN, MOUSE_LEFT, MOUSE_POSITION, MOUSE_RIGHT, MOUSE_UP, PRINT_SCREEN, SUCCESS,
} from '../const';
import { IHandler } from '../types/handler';
import drawCircle from './drawCircle';
import drawRectangle from './drawRectangle';
import drawSquare from './drawSquaare';
import getScreenshot from './getScreenshot';

class Handler implements IHandler {
  private duplex: internal.Duplex;

  private x: number;

  private y: number;

  constructor(duplex: internal.Duplex) {
    this.duplex = duplex;
    this.x = 0;
    this.y = 0;
  }

  private getMouseCoordinates() {
    const { x, y } = robot.getMousePos();
    this.x = x;
    this.y = y;
  }

  private moveMouse() {
    robot.moveMouse(this.x, this.y);
  }

  private sendMousePos() {
    this.duplex._write(`${MOUSE_POSITION} ${this.x},${this.y}\0`, 'utf-8', (err) => err && console.error(err));
    process.stdout.write(SUCCESS);
  }

  private sendCommand(command: string) {
    this.duplex._write(`${command}\0`, 'utf-8', (err) => err && console.error(err));
    process.stdout.write(`${command}${SUCCESS}`);
  }

  [MOUSE_POSITION] = () => {
    this.getMouseCoordinates();
    this.sendMousePos();
  };

  [MOUSE_UP] = ([shift]: string[]) => {
    this.y -= +shift;
    this.moveMouse();
    this.sendMousePos();
  };

  [MOUSE_DOWN] = ([shift]: string[]) => {
    this.y += +shift;
    this.moveMouse();
    this.sendMousePos();
  };

  [MOUSE_LEFT] = ([shift]: string[]) => {
    this.x -= +shift;
    this.moveMouse();
    this.sendMousePos();
  };

  [MOUSE_RIGHT] = ([shift]: string[]) => {
    this.x += +shift;
    this.moveMouse();
    this.sendMousePos();
  };

  [DRAW_SQUARE] = ([size]: string[]) => {
    this.getMouseCoordinates();
    this.sendCommand(DRAW_SQUARE);

    drawSquare(this.x, this.y, +size);
  };

  [DRAW_RECTANGLE] = ([shiftX, shiftY]: string[]) => {
    this.getMouseCoordinates();
    this.sendCommand(DRAW_RECTANGLE);

    drawRectangle(this.x, this.y, +shiftX, +shiftY);
  };

  [DRAW_CIRCLE] = ([radius]: string[]) => {
    this.getMouseCoordinates();
    this.sendCommand(DRAW_CIRCLE);

    drawCircle(this.x, this.y, +radius);
  };

  [PRINT_SCREEN] = () => {
    this.getMouseCoordinates();
    this.sendCommand(PRINT_SCREEN);
    getScreenshot(this.duplex, this.x, this.y);
  };
}

export default Handler;
