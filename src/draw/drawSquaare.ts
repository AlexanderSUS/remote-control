/* eslint-disable no-param-reassign */
import robot from 'robotjs';

const drawSquare = (x: number, y: number, size: number) => {
  const startX = x;
  const startY = y;

  const endX = x + size;
  const endY = y + size;

  robot.mouseClick();

  robot.mouseToggle('down');
  for (;x < endX; x += 1) {
    robot.dragMouse(x, y);
  }
  robot.mouseToggle('up');

  robot.mouseToggle('down');
  for (;y < endY; y += 1) {
    robot.dragMouse(x, y);
  }
  robot.mouseToggle('up');

  robot.mouseToggle('down');
  for (;x > startX; x -= 1) {
    robot.dragMouse(x, y);
  }
  robot.mouseToggle('up');

  robot.mouseToggle('down');
  for (;y > startY; y -= 1) {
    robot.dragMouse(x, y);
  }
  robot.mouseToggle('up');
};

export default drawSquare;
