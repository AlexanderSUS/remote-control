import robot from 'robotjs';
import { Mouse } from '../types/mouse';

const drawCircle = (radius: number) => {
  const mouse: Mouse = robot.getMousePos();
  mouse.x -= radius;

  robot.mouseToggle('down');
  for (let i = 0; i <= Math.PI * 2; i += 0.01) {
    const x = mouse.x + (radius * Math.cos(i));
    const y = mouse.y + (radius * Math.sin(i));

    robot.dragMouse(x, y);
  }
  robot.mouseToggle('up');
};
export default drawCircle;
