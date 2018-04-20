import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import * as math from 'mathjs';
import Arc from './Arc';
import Arrowhead from './Arrowhead';

const ConnectionColor = {
  RIGHT: 0xfc8c67,
  LEFT: 0x66D2F8,
};

const ArrowCenterColor = {
  RIGHT: 0xFF0094,
  LEFT: 0x5D00E6,
};

const ArrowSize = {
  RIGHT: 15,
  LEFT: 20
};

export const ConnectionDirection = {
  RIGHT: 1,
  LEFT: -1
};

// Inheriting from PureComponent to avoid costly pixi re-renders
// See https://reactjs.org/docs/react-component.html#shouldcomponentupdate
export class Connection extends PureComponent {
  static propTypes = {
    startX: PropTypes.number.isRequired,
    startY: PropTypes.number.isRequired,
    endX: PropTypes.number.isRequired,
    endY: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    weight: PropTypes.number,
    direction: PropTypes.number
  };

  static defaultProps = {
    weight: 5,
    direction: ConnectionDirection.RIGHT,
  };

  render() {
    const {
      startX,
      startY,
      endX,
      endY,
      height,
      weight,
      direction,
    } = this.props;

    let primaryColor = ConnectionColor.RIGHT;
    let secondaryColor = ArrowCenterColor.RIGHT;
    let arrowSize = ArrowSize.RIGHT;
    let highlight = true;
    let alpha = 1.0;
    if (direction === ConnectionDirection.LEFT) {
      primaryColor = ConnectionColor.LEFT;
      secondaryColor = ArrowCenterColor.LEFT;
      arrowSize = ArrowSize.LEFT;
      highlight = false;
      alpha = 0.7;
    }

    // Our weights currently decay at 2^-x but we want a more gradual visual dropopff
    // Take the log to get a linear dropoff and then hand tweak that line for a pleasing
    // effect
    const lineWidth = Math.max(0.5, (math.log(weight) + 6) * 0.8);
    return ([
      <Arc
        startX={startX}
        startY={startY}
        endX={endX}
        endY={endY}
        midpointYOffset={height}
        lineWidth={lineWidth}
        color={primaryColor}
        alpha={alpha}
        highlight={highlight}
        key="arc"
      />,
      <Arrowhead
        startX={startX}
        startY={startY}
        endX={endX}
        endY={endY}
        midpointYOffset={height}
        lineWidth={lineWidth}
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        alpha={alpha}
        size={arrowSize}
        key="arrowhead"
      />
    ]);
  }
}
