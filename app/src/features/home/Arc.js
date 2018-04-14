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
      radius,
      fill,
      lineWidth,
      color,
      alpha
    } = newProps;
    // TODO make direction independant
    const midpointX = startX + ((endX - startX) / 2);
    const midpointY = startY - radius;
    instance.clear();
    instance.lineStyle(lineWidth, color, alpha);
    instance.moveTo(startX,startY);
    instance.quadraticCurveTo(midpointX, midpointY, endX, endY);
    console.log('Trying to draw arc');
  }
};
export default CustomPIXIComponent(behavior, TYPE);
