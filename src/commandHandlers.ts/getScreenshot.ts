import Jimp from 'jimp';
import robot from 'robotjs';
import { PRINT_SCREEN } from '../const';

const getScreenshot = async (ws: WebSocket, x: number, y: number) => {
  const SIZE = 200;

  const { image: bitMapBuffer } = robot.screen.capture(x, y, SIZE, SIZE);

  const img = new Jimp({
    data: bitMapBuffer,
    width: SIZE,
    height: SIZE,
  });

  // RETURN WHITE SCREEN
  const buffer = await img.getBufferAsync(img.getMIME());
  const data = buffer.toString('base64');
  ws.send(`${PRINT_SCREEN} ${data}`);

  // RETURN WHITE SCREEN
  // const base64 = await img.getBase64Async(img.getMIME());
  // const data = base64.slice('data:image/png;base64,'.length);
  // ws.send(`${PRINT_SCREEN} ${data}`);

  console.log(`Result: ${data}\nSuccess!`);
};

export default getScreenshot;
