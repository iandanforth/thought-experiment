import React, { PureComponent } from 'react';
import Neuron from './Neuron';

export default class InputNeuron extends PureComponent {
  static propTypes = {

  };

  activeColor = 'rgb(255, 255, 255)';
  inactiveColor = 'rgb(192, 221, 242)';

  render() {
    return (
      <Neuron
        {...this.props}
        inactiveColor={this.inactiveColor}
        activeColor={this.activeColor}
        displayTexture={false}
      />
    );
  }
}
