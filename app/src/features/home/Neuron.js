import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Animated from 'animated';
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
    interactive: PropTypes.bool,
    pointerdown: PropTypes.func,
    pointerup: PropTypes.func
  };

  static defaultProps = {
    neuronState: NeuronState.INACTIVE,
    interactive: false,
    pointerdown: null,
    pointerup: null
  }

  constructor(props) {
    super(props);

    this.state = {
      scale: new Animated.Value(1)
    };

    this.grow = this.grow.bind(this);
    this.shrink = this.shrink.bind(this);
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

  grow() {
    Animated.spring(this.state.scale, { toValue: 8 }).start();
    console.log('Growing!');
  }

  shrink() {
    Animated.spring(this.state.scale, { toValue: 1 }).start();
    console.log('Shrinking!');
  }

  render() {
    const fill = this.getFillForState();
    const propSubset = Object.assign({}, this.props);
    delete propSubset.style; // Pixi throws warning if not removed
    const AnimatedCircle = Animated.createAnimatedComponent(Circle);
    return (
      <AnimatedCircle
        {...propSubset}
        fill={fill}
        interactive
        pointerdown={this.grow}
        pointerup={this.shrink}
        scale={this.state.scale}
      />
    );
  }
}
