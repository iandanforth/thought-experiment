import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Stage } from 'react-pixi-fiber';
import * as math from 'mathjs';
import Neuron from './Neuron';
import { Connection, ConnectionColor } from './Connection';


export default class NetworkContainer extends Component {
  static propTypes = {
    numNeurons: PropTypes.number.isRequired,
    neuronSpacing: PropTypes.number.isRequired,
    neuronRadius: PropTypes.number.isRequired,
    baseConnectionHeight: PropTypes.number.isRequired,
    weights: PropTypes.object.isRequired,
    networkX: PropTypes.number,
    networkY: PropTypes.number
  };

  static defaultProps = {
    networkX: 200,
    networkY: 200
  };

  get neurons() {
    const { numNeurons, neuronSpacing, neuronRadius, networkX, networkY } = this.props;
    const neurons = [];
    const spacing = neuronSpacing + (2 * neuronRadius);
    for (let i = 0; i < numNeurons; i++) {
      const key = `neuron-${i}`;
      const offset = spacing * i;
      const x = networkX + offset;
      const y = networkY;
      const neuron = (
        <Neuron x={x} y={y} radius={neuronRadius} key={key} />
      );
      neurons.push(neuron);
    }
    return neurons;
  }

  get connections() {
    const {
      neuronSpacing,
      neuronRadius,
      baseConnectionHeight,
      weights,
      networkX,
      networkY
    } = this.props;

    const [numRows, numColumns] = weights.size();

    const connections = [];
    const spacing = neuronSpacing + (2 * neuronRadius);
    const vertSpacing = 30;

    for (let ri = 0; ri < numRows; ri++) {
      for (let ci = 0; ci < numColumns; ci++) {
        // Ignore diagonal / recurrent connections
        if (ri !== ci) {
          const weight = weights.subset(math.index(ri, ci));
          const key = `connection-${ri}-${ci}`;
          const startOffset = spacing * ri;
          // How far away (by count of neurons) is our end?
          const targetDistance = Math.abs(ri - ci);
          const endOffset = spacing * targetDistance;
          const vertOffset = vertSpacing * targetDistance;
          const x = networkX + startOffset;

          let direction = 1;
          let color;
          if (ci < ri) {
            direction = -1;
            color = ConnectionColor.LEFT;
          }
          const y = networkY - (neuronRadius * direction);
          const connectionHeight = (baseConnectionHeight + vertOffset) * direction;
          const endX = x + (endOffset * direction);
          const connection = (
            <Connection
              startX={x}
              startY={y}
              endX={endX}
              endY={y}
              height={connectionHeight}
              weight={weight}
              color={color}
              key={key}
            />
          );
          connections.push(connection);
        }
      }
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
