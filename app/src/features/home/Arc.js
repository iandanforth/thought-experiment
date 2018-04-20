import { CustomPIXIComponent } from 'react-pixi-fiber';
import { DropShadowFilter } from '@pixi/filter-drop-shadow';
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
      alpha,
      highlight
    } = newProps;
    const midpointX = startX + ((endX - startX) / 2);
    const midpointY = startY - midpointYOffset;
    instance.clear();
    instance.lineStyle(lineWidth, color, alpha);
    instance.moveTo(startX, startY);
    instance.quadraticCurveTo(midpointX, midpointY, endX, endY);
    if (highlight) {
      const dropShadow = new DropShadowFilter();
      dropShadow.color = '0xEEE4DA';
      dropShadow.rotation = -90;
      dropShadow.blur = 0.2;
      dropShadow.alpha = 0.8;
      dropShadow.distance = 0;
      dropShadow.resolution = 2;
      instance.filters = [dropShadow];
    }
  }
};
export default CustomPIXIComponent(behavior, TYPE);
