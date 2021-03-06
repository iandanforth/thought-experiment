import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Arc from './Arc';
import Arrowhead from './Arrowhead';

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
    connectionColor: PropTypes.number.isRequired,
    arrowCenterColor: PropTypes.number.isRequired,
    aboveThresholdColor: PropTypes.number.isRequired,
    arrowSize: PropTypes.number.isRequired,
    highlight: PropTypes.bool.isRequired,
    alpha: PropTypes.number.isRequired,
    weight: PropTypes.number,
  };

  static defaultProps = {
    weight: 5,
  };

  get arrowhead() {
    const {
      startX,
      startY,
      endX,
      endY,
      height,
      weight,
      connectionColor,
      arrowCenterColor,
      arrowSize,
    } = this.props;

    if (weight === 0) return null;

    return (
      <Arrowhead
        startX={startX}
        startY={startY}
        endX={endX}
        endY={endY}
        midpointYOffset={height}
        primaryColor={connectionColor}
        secondaryColor={arrowCenterColor}
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
      connectionColor,
      aboveThresholdColor,
      highlight,
      alpha,
    } = this.props;

    const lineWidth = weight * width;
    const color = (weight > 0.7) ? aboveThresholdColor : connectionColor;
    return ([
      <Arc
        startX={startX}
        startY={startY}
        endX={endX}
        endY={endY}
        midpointYOffset={height}
        lineWidth={lineWidth}
        color={color}
        alpha={alpha}
        highlight={highlight}
        key="arc"
      />,
      this.arrowhead
    ]);
  }
}
