import { CustomPIXIComponent } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';

const TYPE = 'Arrowhead';
export const behavior = {
  customDisplayObject: () => {
    return new PIXI.Graphics();
  },
  /* eslint-disable object-shorthand, func-names, no-param-reassign */
  // Note we need to use a function declaration rather than an arrow function here
  // to get the right 'this' context
  customApplyProps: function (instance, oldProps, newProps) {
    const {
      startX,
      startY,
      endX,
      endY,
      midpointYOffset,
      primaryColor,
      secondaryColor,
      size
    } = newProps;
    // Move frame of reference 0,0 to endpoint
    instance.x = endX;
    instance.y = endY;
    // Draw arrowhead tip down
    const ratio = 4;
    instance.clear();
    instance.lineStyle(1, primaryColor, 1.0);
    instance.beginFill(secondaryColor);
    instance.moveTo(0, 0);
    instance.lineTo(-size / ratio, -size);
    instance.quadraticCurveTo(0, -size / 1.5, size / ratio, -size);
    instance.lineTo(0, 0);
    instance.endFill();
    // Rotate around tip to appropriate angle
    const midpointX = startX + ((endX - startX) / 2);
    const midpointY = startY - midpointYOffset;
    const theta = Math.atan2(endY - midpointY, endX - midpointX);
    instance.rotation = -((Math.PI / 2) - theta);
    // Blur
    // const blurFilter = new PIXI.filters.BlurFilter();
    // instance.filters = [blurFilter];
    // blurFilter.blur = 0.4;
  }
};
export default CustomPIXIComponent(behavior, TYPE);
