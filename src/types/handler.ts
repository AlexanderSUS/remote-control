import {
  DRAW_CIRCLE,
  DRAW_RECTANGLE,
  DRAW_SQUARE,
  MOUSE_DOWN, MOUSE_LEFT, MOUSE_POSITION, MOUSE_RIGHT, MOUSE_UP, PRINT_SCREEN,
} from '../const';

export interface IHandler {
  [MOUSE_DOWN]: ([shift]: string[]) => void,
  [MOUSE_UP]: ([shift]: string[]) => void,
  [MOUSE_LEFT]: ([shift]: string[]) => void,
  [MOUSE_RIGHT]: ([shift]: string[]) => void,
  [DRAW_SQUARE]: ([shift]: string[]) => void,
  [DRAW_RECTANGLE]: ([shiftX, shiftY]: string[]) => void,
  [DRAW_CIRCLE]: ([radius]: string[]) => void,
  [PRINT_SCREEN]: VoidFunction,
  [MOUSE_POSITION]: VoidFunction,
}

export type HandlerCommand = keyof IHandler;

export type MousePosOrPrntScrn = Extract<HandlerCommand, 'mouse_position' | 'prnt_scrn'>;
