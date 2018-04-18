import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as math from 'mathjs';
import Arc from './Arc';

export default class Connection extends Component {
  static propTypes = {
    startX: PropTypes.number.isRequired,
    startY: PropTypes.number.isRequired,
    endX: PropTypes.number.isRequired,
    endY: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    fill: PropTypes.number,
    weight: PropTypes.number,
    color: PropTypes.number,
    alpha: PropTypes.number
  };

  static defaultProps = {
    fill: 0xf7842c,
    weight: 5,
    color: 0xf7842c,
    alpha: 1.0
  };

  render() {
    const {
      startX,
      startY,
      endX,
      endY,
      height,
      fill,
      weight,
      color,
      alpha
    } = this.props;

    // Our weights currently decay at 2^-x but we want a more gradual visual dropopff
    // Take the log to get a linear dropoff and then hand tweak that line for a pleasing
    // effect
    const lineWidth = Math.max(0.5, (math.log(weight) + 6) * 0.8);
    return (
      <Arc
        startX={startX}
        startY={startY}
        endX={endX}
        endY={endY}
        midpointYOffset={height}
        fill={fill}
        lineWidth={lineWidth}
        color={color}
        alpha={alpha}
      />
    );
  }
}
