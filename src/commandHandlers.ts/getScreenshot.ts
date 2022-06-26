import Jimp from 'jimp';
import robot from 'robotjs';
import { PRINT_SCREEN } from '../const';

const getScreenshot = async (ws: WebSocket, x: number, y: number) => {
  const SIZE = 200;

  const swapRedAndBlueChannel = (bmp: robot.Bitmap) => {
    for (let i = 0; i < (bmp.width * bmp.height) * 4; i += 4) { // swap red and blue channel
      [bmp.image[i], bmp.image[i + 2]] = [bmp.image[i + 2], bmp.image[i]]; // red channel
    }
  };

  const bmp = robot.screen.capture(x, y, SIZE, SIZE);
  swapRedAndBlueChannel(bmp);
  const jimpImg = new Jimp(SIZE, SIZE);

  jimpImg.bitmap.data = bmp.image;

  const buffer = await jimpImg.getBufferAsync(jimpImg.getMIME());
  const data = buffer.toString('base64');
  ws.send(`${PRINT_SCREEN} ${data}\0`);
};

export default getScreenshot;
