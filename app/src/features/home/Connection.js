import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Arc from './Arc';
import Arrowhead from './Arrowhead';

// TODO implement left and right connections
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
    width: PropTypes.number.isRequired,
    weight: PropTypes.number,
    direction: PropTypes.number
  };

  static defaultProps = {
    weight: 5,
    direction: ConnectionDirection.RIGHT,
  };

  get arrowhead() {
    const {
      startX,
      startY,
      endX,
      endY,
      height,
      weight,
      direction,
    } = this.props;

    if (weight === 0) return null;

    let primaryColor = ConnectionColor.RIGHT;
    let secondaryColor = ArrowCenterColor.RIGHT;
    let arrowSize = ArrowSize.RIGHT;
    if (direction === ConnectionDirection.LEFT) {
      primaryColor = ConnectionColor.LEFT;
      secondaryColor = ArrowCenterColor.LEFT;
      arrowSize = ArrowSize.LEFT;
    }

    return (
      <Arrowhead
        startX={startX}
        startY={startY}
        endX={endX}
        endY={endY}
        midpointYOffset={height}
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        size={arrowSize}
        key="arrowhead"
      />
    );
  }

  render() {
    const {
      startX,
      startY,
      endX,
      endY,
      height,
      width,
      weight,
      direction,
    } = this.props;

    let primaryColor = ConnectionColor.RIGHT;
    let highlight = true;
    let alpha = 1.0;
    if (direction === ConnectionDirection.LEFT) {
      primaryColor = ConnectionColor.LEFT;
      highlight = false;
      alpha = 0.7;
    }

    const lineWidth = weight * width;
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
      this.arrowhead
    ]);
  }
}
