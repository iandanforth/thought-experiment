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
      fill,
      lineWidth,
      color,
      alpha
    } = newProps;
    // TODO make direction independant
    const midpointX = startX + ((endX - startX) / 2);
    const midpointY = startY - midpointYOffset;
    instance.clear();
    instance.lineStyle(lineWidth, color, alpha);
    instance.moveTo(startX, startY);
    instance.quadraticCurveTo(midpointX, midpointY, endX, endY);
    // const blurFilter = new PIXI.filters.BlurFilter();
    // instance.filters = [blurFilter];
    // blurFilter.blur = 0.3;
  }
};
export default CustomPIXIComponent(behavior, TYPE);
