import robot from 'robotjs';

const drawCircle = (x: number, y: number, radius: number) => {
  x -= radius;

  robot.mouseToggle('down');
  for (let i = 0; i <= Math.PI * 2; i += 0.01) {
    const newX = x + (radius * Math.cos(i));
    const newY = y + (radius * Math.sin(i));

    robot.dragMouse(newX, newY);
  }
  robot.mouseToggle('up');
};

export default drawCircle;
