/* eslint-disable no-param-reassign */
import robot from 'robotjs';
import { Mouse } from '../types/mouse';

export const moveMouseUp = (mouse: Mouse, shift: number) => {
  mouse.y -= shift;
  robot.moveMouse(mouse.x, mouse.y);
};

export const moveMouseDown = (mouse: Mouse, shift: number) => {
  mouse.y += shift;
  robot.moveMouse(mouse.x, mouse.y);
};

export const moveMouseLeft = (mouse: Mouse, shift: number) => {
  mouse.x -= shift;
  robot.moveMouse(mouse.x, mouse.y);
};

export const moveMouseRight = (mouse: Mouse, shift: number) => {
  mouse.x += shift;
  robot.moveMouse(mouse.x, mouse.y);
};
