import robot from 'robotjs';
import internal from 'stream';
import {
  DRAW_CIRCLE,
  DRAW_RECTANGLE,
  DRAW_SQUARE,
  MOUSE_DOWN, MOUSE_LEFT, MOUSE_POSITION, MOUSE_RIGHT, MOUSE_UP, PRINT_SCREEN, SIZE,
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

  private shifts: number[];

  constructor(duplex: internal.Duplex) {
    this.duplex = duplex;
    this.x = 0;
    this.y = 0;
    this.shifts = [];
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
    process.stdout.write(`. Result: mouse position: x: ${this.x}, y: ${this.y}\n`);
  }

  private printResult(command: string) {
    if (command === PRINT_SCREEN) {
      process.stdout.write(`. Result: screenshoot ${SIZE} * ${SIZE} px\n`);
    }

    if (command === DRAW_CIRCLE) {
      const [radius] = this.shifts;
      process.stdout.write(`. Result: circle with r=${radius} px\n`);
    }

    if (command === DRAW_RECTANGLE) {
      const [width, height] = this.shifts;
      process.stdout.write(`. Result: rectange, size: ${width} * ${height} px\n`);
    }

    if (command === DRAW_SQUARE) {
      const [side] = this.shifts;
      process.stdout.write(`. Result: square, size: ${side} * ${side} px\n`);
    }
  }

  private sendCommand(command: string) {
    this.duplex._write(`${command}\0`, 'utf-8', (err) => err && console.error(err));
    this.printResult(command);
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
    this.shifts = [+size, +size];
    this.getMouseCoordinates();
    this.sendCommand(DRAW_SQUARE);

    drawSquare(this.x, this.y, +size);
  };

  [DRAW_RECTANGLE] = ([shiftX, shiftY]: string[]) => {
    this.shifts = [+shiftX, +shiftY];
    this.getMouseCoordinates();
    this.sendCommand(DRAW_RECTANGLE);

    drawRectangle(this.x, this.y, +shiftX, +shiftY);
  };

  [DRAW_CIRCLE] = ([radius]: string[]) => {
    this.shifts = [+radius];
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
