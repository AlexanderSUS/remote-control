/* eslint-disable no-param-reassign */
import robot from 'robotjs';

const drawRectangle = (x: number, y: number, shiftX: number, shiftY: number) => {
  const startX = x;
  const startY = y;

  const endX = x + shiftX;
  const endY = y + shiftY;

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

export default drawRectangle;
