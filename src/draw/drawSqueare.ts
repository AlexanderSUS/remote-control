import robot from 'robotjs';
import { Mouse } from '../types/mouse';

const drawSquare = (size: number) => {
  const mouse: Mouse = robot.getMousePos();

  const startX = mouse.x;
  const startY = mouse.y;

  const endX = mouse.x + size;
  const endY = mouse.y + size;

  robot.mouseClick();

  robot.mouseToggle('down');
  for (;mouse.x < endX; mouse.x += 1) {
    robot.dragMouse(mouse.x, mouse.y);
  }
  robot.mouseToggle('up');

  robot.mouseToggle('down');
  for (;mouse.y < endY; mouse.y += 1) {
    robot.dragMouse(mouse.x, mouse.y);
  }
  robot.mouseToggle('up');

  robot.mouseToggle('down');
  for (;mouse.x > startX; mouse.x -= 1) {
    robot.dragMouse(mouse.x, mouse.y);
  }
  robot.mouseToggle('up');

  robot.mouseToggle('down');
  for (;mouse.y > startY; mouse.y -= 1) {
    robot.dragMouse(mouse.x, mouse.y);
  }
  robot.mouseToggle('up');
};

export default drawSquare;
