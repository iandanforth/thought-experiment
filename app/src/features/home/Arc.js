import { CustomPIXIComponent } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';

const TYPE = 'Arc';
export const behavior = {
  customDisplayObject: () => {
    return new PIXI.Graphics();
  },
  customApplyProps: (instance, oldProps, newProps) => {
    const {
      startX,
      startY,
      endX,
      endY,
      midpointYOffset,
      lineWidth,
      color,
      alpha
    } = newProps;
    const midpointX = startX + ((endX - startX) / 2);
    const midpointY = startY - midpointYOffset;
    instance.clear();
    instance.lineStyle(lineWidth, color, alpha);
    instance.moveTo(startX, startY);
    instance.quadraticCurveTo(midpointX, midpointY, endX, endY);
  }
};
export default CustomPIXIComponent(behavior, TYPE);
