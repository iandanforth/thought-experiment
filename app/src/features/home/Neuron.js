import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Circle from './Circle';

export default class Neuron extends Component {
  static propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    radius: PropTypes.number.isRequired
  };

  render() {
    const { x, y, radius } = this.props;
    return (
      <Circle x={x} y={y} radius={radius} />
    );
  }
}
