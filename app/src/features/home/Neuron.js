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
  static contextTypes = {
    renderStage: PropTypes.func
  };

  static propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    radius: PropTypes.number.isRequired,
    active: PropTypes.bool,
    inactiveColor: PropTypes.string,
    activeColor: PropTypes.string,
    displayTexture: PropTypes.bool,
    interactive: PropTypes.bool,
    pointerdown: PropTypes.func,
    pointerup: PropTypes.func,
    fadeDuration: PropTypes.number
  };

  static defaultProps = {
    active: false,
    inactiveColor: 'rgb(212, 225, 246)',
    activeColor: 'rgb(255, 121, 0)',
    displayTexture: true,
    interactive: false,
    pointerdown: null,
    pointerup: null,
    fadeDuration: 200
  }

  constructor(props) {
    super(props);
    const { inactiveColor, activeColor } = this.props;
    const animValue = new Animated.Value(1);
    this.state = {
      animValue,
    };

    this.loadedTextures = 0;
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

  get texture() {
    const { x, y, radius, displayTexture } = this.props;
    if (!displayTexture) { return null; }
    const spriteWidth = radius * 2;
    const spriteX = x - radius;
    const spriteY = y - radius;
    const alpha = 0.6;
    const texture = PIXI.Texture.fromImage(sphere);
    // Texture loading doesn't cause state change so handle render separately here
    texture.on('update', this.context.renderStage);
    return (
      <Sprite
        texture={texture}
        width={spriteWidth}
        height={spriteWidth}
        x={spriteX}
        y={spriteY}
        alpha={alpha}
        key="sprite"
      />
    );
  }

  grow() {
    const { fadeDuration } = this.props;
    Animated.timing(
      this.state.animValue,
      {
        toValue: this.interpInputRange[1],
        duration: fadeDuration
      }
    ).start();
  }

  shrink() {
    const { fadeDuration } = this.props;
    Animated.timing(
      this.state.animValue,
      {
        toValue: this.interpInputRange[0],
        duration: fadeDuration
      }
    ).start();
  }

  renderAfterTextureLoad() {

  }

  render() {
    const AnimatedCircle = Animated.createAnimatedComponent(Circle);
    return ([
      <AnimatedCircle
        {...this.props}
        fill={this.interpolatedValue}
        interactive
        pointerdown={this.grow}
        pointerup={this.shrink}
        scale={1}
        renderStage={this.context.renderStage}
        key="circle"
      />,
      this.texture
    ]);
  }
}
