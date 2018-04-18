import { CustomPIXIComponent } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';

function cleanProps(props) {
  const clonedProps = Object.assign({}, props);
  if (Object.prototype.hasOwnProperty.call(clonedProps, 'style')) {
    delete clonedProps.style;
  }
  return clonedProps;
}

const TYPE = 'Circle';
export const behavior = {
  customDisplayObject: () => {
    return new PIXI.Graphics();
  },
  /* eslint-disable object-shorthand, func-names */
  // Note we need to use a function declaration rather than an arrow function here
  // to get the right 'this' context
  customApplyProps: function (instance, oldProps, newProps) {
    // Apply all props.
    // Passed through:
    //  x
    //  y
    //  interactive
    //  onpointerdown
    //  onpointerup
    const cleanOldProps = cleanProps(oldProps);
    const cleanNewProps = cleanProps(newProps);
    this.applyDisplayObjectProps(cleanOldProps, cleanNewProps);
    const {
      fill,
      radius
    } = cleanNewProps;
    instance.clear();
    instance.beginFill(fill);
    instance.drawCircle(0, 0, radius);
    instance.endFill();
  }
};
export default CustomPIXIComponent(behavior, TYPE);
