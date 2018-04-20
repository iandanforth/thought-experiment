import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Animated from 'animated';
import { Sprite } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';
import Circle from './Circle';
import sphere from '../../images/small-sphere-transparent.png';

// Inheriting from PureComponent to avoid costly pixi re-renders
// See https://reactjs.org/docs/react-component.html#shouldcomponentupdate
export default class Neuron extends PureComponent {
  static propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    radius: PropTypes.number.isRequired,
    active: PropTypes.bool,
    inactiveColor: PropTypes.string,
    activeColor: PropTypes.string,
    interactive: PropTypes.bool,
    pointerdown: PropTypes.func,
    pointerup: PropTypes.func
  };

  static defaultProps = {
    active: false,
    inactiveColor: 'rgb(136, 136, 152)',
    activeColor: 'rgb(255, 121, 0)',
    interactive: false,
    pointerdown: null,
    pointerup: null
  }

  constructor(props) {
    super(props);
    const { inactiveColor, activeColor } = this.props;
    const animValue = new Animated.Value(1);
    this.state = {
      animValue,
    };

    this.interpInputRange = [1, 8];
    this.interpolatedValue = animValue.interpolate({
      inputRange: this.interpInputRange,
      outputRange: [inactiveColor, activeColor]
    });

    this.grow = this.grow.bind(this);
    this.shrink = this.shrink.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { active } = this.props;
    const prevActive = prevProps.active;
    if (active !== prevActive) {
      if (active) {
        this.grow();
      } else {
        this.shrink();
      }
    }
  }

  grow() {
    Animated.timing(this.state.animValue, { toValue: this.interpInputRange[1] }).start();
  }

  shrink() {
    Animated.timing(this.state.animValue, { toValue: this.interpInputRange[0] }).start();
  }

  render() {
    const AnimatedCircle = Animated.createAnimatedComponent(Circle);
    const { x, y, radius } = this.props;
    const spriteWidth = radius * 2;
    const spriteX = x - radius;
    const spriteY = y - radius;
    const alpha = 0.6;
    return ([
      <AnimatedCircle
        {...this.props}
        fill={this.interpolatedValue}
        interactive
        pointerdown={this.grow}
        pointerup={this.shrink}
        scale={1}
        key="circle"
      />,
      <Sprite
        texture={PIXI.Texture.fromImage(sphere)}
        width={spriteWidth}
        height={spriteWidth}
        x={spriteX}
        y={spriteY}
        alpha={alpha}
        key="sprite"
      />
    ]);
  }
}
