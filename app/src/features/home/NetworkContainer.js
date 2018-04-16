import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Stage } from 'react-pixi-fiber';
import { Neuron } from './Neuron';
import Connection from './Connection';


export default class NetworkContainer extends Component {
  static propTypes = {
    numNeurons: PropTypes.number.isRequired,
    neuronSpacing: PropTypes.number.isRequired,
    neuronRadius: PropTypes.number.isRequired,
    baseConnectionHeight: PropTypes.number.isRequired,
    weights: PropTypes.object.isRequired
  };

  get neurons() {
    const { numNeurons, neuronSpacing, neuronRadius } = this.props;
    const neurons = [];
    const startX = 200;
    const startY = 300;
    const spacing = neuronSpacing + (2 * neuronRadius);
    for (let i = 0; i < numNeurons; i++) {
      const key = `neuron-${i}`;
      const offset = spacing * i;
      const x = startX + offset;
      const y = startY;
      const neuron = (
        <Neuron x={x} y={y} radius={neuronRadius} key={key} />
      );
      neurons.push(neuron);
    }
    return neurons;
  }

  get connections() {
    const {
      numNeurons,
      neuronSpacing,
      neuronRadius,
      baseConnectionHeight,
      weights 
    } = this.props;
    const connections = [];
    const startX = 200;
    const startY = 300 - neuronRadius;
    const spacing = neuronSpacing + (2 * neuronRadius);

    for (let i = 0; i < numNeurons - 1; i++) {
      const key = `connection-${i}`;
      const offset = spacing * i;
      const x = startX + offset;
      const y = startY;
      const endX = x + spacing;
      const connection = (
        <Connection
          startX={x}
          startY={y}
          endX={endX}
          endY={y}
          height={baseConnectionHeight}
          key={key}
        />
      );
      connections.push(connection);
    }
    return connections;
  }

  render() {
    const stageOptions = {
      backgroundColor: 0xFFFFFF,
      antialias: true,
      resolution: 2
    };

    return (
      <div className="home-network-container">
        <Stage height={400} width={800} options={stageOptions}>
          {this.connections}
          {this.neurons}
        </Stage>
      </div>
    );
  }
}
