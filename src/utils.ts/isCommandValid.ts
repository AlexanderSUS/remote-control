import {
  DRAW_CIRCLE,
  DRAW_RECTANGLE,
  DRAW_SQUARE,
  MOUSE_DOWN, MOUSE_LEFT, MOUSE_POSITION, MOUSE_RIGHT, MOUSE_UP, PRINT_SCREEN,
} from '../const';
import { HandlerCommand } from '../types/handler';

function isCommandValid(command: string | HandlerCommand): command is HandlerCommand {
  return (command === MOUSE_UP
    || command === MOUSE_DOWN
    || command === MOUSE_LEFT
    || command === MOUSE_RIGHT
    || command === MOUSE_POSITION
    || command === DRAW_CIRCLE
    || command === DRAW_RECTANGLE
    || command === DRAW_SQUARE
    || command === PRINT_SCREEN
  );
}

export default isCommandValid;
