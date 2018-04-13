import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Stage } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';
import Neuron from './Neuron';
import Connection from './Connection';


export default class NetworkContainer extends Component {
  static propTypes = {
    numNeurons: PropTypes.number.isRequired,
    weights: PropTypes.object.isRequired
  };

  get neurons() {
    const { numNeurons } = this.props;
    const neurons = [];
    const startX = 200;
    const startY = 300;
    const radius = 15;
    const spacing = 30 + (2 * radius);
    for (let i = 0; i < numNeurons; i++) {
      const offset = spacing * i;
      const x = startX + offset;
      const y = startY;
      const neuron = (
        <Neuron x={x} y={y} radius={radius} />
      );
      neurons.push(neuron);
    }
    return neurons;
  }

  render() {
    const stageOptions = {
      backgroundColor: 0xFFFF22
    };

    return (
      <div className="home-network-container">
        Component content: home/NetworkContainer
        <Stage height={800} width={800} options={stageOptions}>
          {this.neurons}
        </Stage>
        <Connection />
      </div>
    );
  }
}
