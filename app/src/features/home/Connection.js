import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Arc from './Arc';

export default class Connection extends Component {
  static propTypes = {
    startX: PropTypes.number.isRequired,
    startY: PropTypes.number.isRequired,
    endX: PropTypes.number.isRequired,
    endY: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    fill: PropTypes.number,
    lineWidth: PropTypes.number,
    color: PropTypes.number,
    alpha: PropTypes.number
  };

  static defaultProps = {
    fill: 0xf7842c,
    lineWidth: 5,
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
      lineWidth,
      color,
      alpha
    } = this.props;
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
