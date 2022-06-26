import Jimp from 'jimp';
import robot from 'robotjs';
import { PRINT_SCREEN } from '../const';

const getScreenshot = async (ws: WebSocket, x: number, y: number) => {
  const SIZE = 200;

  const { image: captureImg } = robot.screen.capture(x, y, SIZE, SIZE);

  const jimpImg = new Jimp(SIZE, SIZE);

  jimpImg.bitmap.data = captureImg;

  // RETURN WHITE SCREEN
  const buffer = await jimpImg.getBufferAsync(jimpImg.getMIME());
  const data = buffer.toString('base64');
  ws.send(`${PRINT_SCREEN} ${data}\0`);

  // RETURN WHITE SCREEN
  // const base64 = await img.getBase64Async(img.getMIME());
  // const data = base64.slice('data:image/png;base64,'.length);
  // ws.send(`${PRINT_SCREEN} ${data}`);

  // console.log(`Result: ${data}\nSuccess!`);
};

export default getScreenshot;
