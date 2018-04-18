import { CustomPIXIComponent } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';

// From Stack Overlflow
// https://stackoverflow.com/a/34683867/1775741
function parseColor(color) {
  const arr = [];
  color.replace(/[\d+\.]+/g, (v) => { arr.push(parseFloat(v)); });
  return {
    hex: '0x' + arr.slice(0, 3).map(toHex).join(''),
    opacity: arr.length === 4 ? arr[3] : 1
  };
}
function toHex(int) {
  const hex = int.toString(16);
  return hex.length === 1 ? '0' + hex : hex;
}
// End SO code

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
    const fillObj = parseColor(fill);
    instance.beginFill(fillObj.hex);
    instance.drawCircle(0, 0, radius);
    instance.endFill();
  }
};
export default CustomPIXIComponent(behavior, TYPE);
