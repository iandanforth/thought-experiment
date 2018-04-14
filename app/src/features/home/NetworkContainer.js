import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Stage } from 'react-pixi-fiber';
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

  get connections() {
    const { numNeurons, weights } = this.props;
    const connections = [];
    const startX = 200;
    const startY = 300;
    // TODO Move radius and spacing into defaultProps
    const radius = 15;
    const spacing = 30 + (2 * radius);
    const arcHeight = 30;

    for (let i = 0; i < numNeurons - 1; i++) {
      const offset = spacing * i;
      const x = startX + offset;
      const y = startY;
      const endX = x + spacing;
      console.log(x, endX);
      const connection = (
        <Connection
          startX={x}
          startY={y}
          endX={endX}
          endY={y}
          radius={arcHeight}
        />
      );
      connections.push(connection);
    }
    return connections;
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
          {this.connections}
        </Stage>
      </div>
    );
  }
}
