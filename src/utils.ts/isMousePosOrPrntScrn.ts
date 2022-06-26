import { MOUSE_POSITION, PRINT_SCREEN } from '../const';
import { HandlerCommand, MousePosOrPrntScrn } from '../types/handler';

function isMousePosOrPrintScrn(command: HandlerCommand): command is MousePosOrPrntScrn {
  return command === MOUSE_POSITION || command === PRINT_SCREEN;
}

export default isMousePosOrPrintScrn;
