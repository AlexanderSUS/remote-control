import {
  DRAW_CIRCLE,
  DRAW_RECTANGLE,
  DRAW_SQUARE,
  MOUSE_DOWN, MOUSE_LEFT, MOUSE_POSITION, MOUSE_RIGHT, MOUSE_UP, PRINT_SCREEN,
} from '../const';

export type HandlerCommand = typeof MOUSE_UP
  | typeof MOUSE_DOWN
  | typeof MOUSE_LEFT
  | typeof MOUSE_RIGHT
  | typeof MOUSE_POSITION
  | typeof DRAW_CIRCLE
  | typeof DRAW_RECTANGLE
  | typeof DRAW_SQUARE
  | typeof PRINT_SCREEN;
