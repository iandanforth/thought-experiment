import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Animated from 'animated';
import chroma from 'chroma-js';
import Circle from './Circle';

export const NeuronState = {
  ACTIVE: 0,
  INACTIVE: 1,
  OFF_INPUT: 2,
  ON_INPUT: 3
};

// Inheriting from PureComponent to avoid costly pixi re-renders
// See https://reactjs.org/docs/react-component.html#shouldcomponentupdate
export class Neuron extends PureComponent {
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

    const animValue = new Animated.Value(1);
    this.state = {
      animValue,
    };

    // Default color interpolation
    this.interpInputRange = [1, 8];
    this.interpolatedValue = animValue.interpolate({
      inputRange: this.interpInputRange,
      outputRange: ['rgb(136, 136, 152)', 'rgb(255, 121, 0)']
    });

    this.grow = this.grow.bind(this);
    this.shrink = this.shrink.bind(this);
  }

  componentDidMount() {
    this.setInterpolationRangeForState();
  }

  componentDidUpdate(prevProps) {
    const { neuronState } = this.props;
    const prevNeuronState = prevProps.neuronState;

    let changeHandled = 0;
    // TODO: Simplify this. Maybe a 2x2 array with handlers.
    if (neuronState !== prevNeuronState) {
      this.setInterpolationRangeForState();
      if (prevNeuronState === NeuronState.INACTIVE && neuronState === NeuronState.ACTIVE) {
        this.grow();
        changeHandled += 1;
      }
      if (prevNeuronState === NeuronState.ACTIVE && neuronState === NeuronState.INACTIVE) {
        this.shrink();
        changeHandled += 1;
      }
      if (prevNeuronState === NeuronState.OFF_INPUT && neuronState === NeuronState.ON_INPUT) {
        this.grow();
        changeHandled += 1;
      }
      if (prevNeuronState === NeuronState.ON_INPUT && neuronState === NeuronState.OFF_INPUT) {
        this.shrink();
        changeHandled += 1;
      }
      if (changeHandled !== 1) {
        console.warn(`Neuron had an unexpected state change. 
          prev: ${prevNeuronState} next: ${neuronState} total: ${changeHandled}`);
      }
    }
  }

  setInterpolationRangeForState() {
    const { neuronState } = this.props;
    let startFill = 'rgb(136, 136, 152)';
    let endFill = 'rgb(255, 121, 0)';
    switch (neuronState) {
      case NeuronState.ACTIVE:
      case NeuronState.INACTIVE:
        startFill = 'rgb(136, 136, 152)';
        endFill = 'rgb(255, 121, 0)';
        break;
      case NeuronState.ON_INPUT:
      case NeuronState.OFF_INPUT:
        startFill = 'rgb(255, 255, 255)';
        endFill = 'rgb(192, 221, 242)';
        break;
      default:
        break;
    }
    this.interpolatedValue = this.state.animValue.interpolate({
      inputRange: this.interpInputRange,
      outputRange: [startFill, endFill]
    });
  }

  grow() {
    Animated.timing(this.state.animValue, { toValue: 8 }).start();
  }

  shrink() {
    Animated.timing(this.state.animValue, { toValue: 1 }).start();
  }

  render() {
    const AnimatedCircle = Animated.createAnimatedComponent(Circle);
    return (
      <AnimatedCircle
        {...this.props}
        fill={this.interpolatedValue}
        interactive
        pointerdown={this.grow}
        pointerup={this.shrink}
        scale={1}
      />
    );
  }
}
