import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Circle from './Circle';

export const NeuronState = {
  ACTIVE: 0,
  INACTIVE: 1,
  OFF_INPUT: 2,
  ON_INPUT: 3
};

export class Neuron extends Component {
  static propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    radius: PropTypes.number.isRequired,
    neuronState: PropTypes.number,
  };

  static defaultProps = {
    neuronState: NeuronState.INACTIVE
  }

  getFillForState() {
    const { neuronState } = this.props;
    let fill = 0x888898;
    switch (neuronState) {
      case NeuronState.ACTIVE:
        fill = 0xFF867B;
        break;
      case NeuronState.INACTIVE:
        fill = 0x888898;
        break;
      case NeuronState.OFF_INPUT:
        fill = 0xFFFFFF;
        break;
      case NeuronState.ON_INPUT:
        fill = 0xC0DDF2;
        break;
      default:
        return fill;
    }
    return fill;
  }

  render() {
    const { x, y, radius } = this.props;
    const fill = this.getFillForState();
    return (
      <Circle x={x} y={y} radius={radius} fill={fill} />
    );
  }
}
