import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Arc from './Arc';

export default class Connection extends Component {
  static propTypes = {
    startX: PropTypes.number.isRequired,
    startY: PropTypes.number.isRequired,
    endX: PropTypes.number.isRequired,
    endY: PropTypes.number.isRequired,
    radius: PropTypes.number,
    fill: PropTypes.number,
    lineWidth: PropTypes.number,
    color: PropTypes.number,
    alpha: PropTypes.number
  };

  static defaultProps = {
    radius: 20,
    fill: 0x003399,
    lineWidth: 5,
    color: 0x003399,
    alpha: 1.0
  };

  render() {
    const {
      startX,
      startY,
      endX, endY,
      radius,
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
        radius={radius}
        fill={fill}
        lineWidth={lineWidth}
        color={color}
        alpha={alpha}
      />
    );
  }
}
