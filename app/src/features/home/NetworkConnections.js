import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as math from 'mathjs';
import { ConnectionDirection } from './Connection';
import ConnectionRight from './ConnectionRight';
import ConnectionLeft from './ConnectionLeft';
import { calcUnitX } from '../../common/displayHelpers';

export default class NetworkConnections extends Component {
  static propTypes = {
    neuronRadius: PropTypes.number.isRequired,
    baseConnectionHeight: PropTypes.number.isRequired,
    baseConnectionWidth: PropTypes.number.isRequired,
    tm: PropTypes.object.isRequired,
    networkY: PropTypes.number.isRequired,
    stageWidth: PropTypes.number.isRequired,
    neuronSpacing: PropTypes.number.isRequired,
    numNeurons: PropTypes.number.isRequired
  };

  get connections() {
    const {
      neuronRadius,
      baseConnectionHeight,
      baseConnectionWidth,
      tm,
      networkY,
      stageWidth,
      neuronSpacing,
      numNeurons
    } = this.props;

    const [numRows, numColumns] = tm.size();

    const connections = [];
    const vertSpacing = 30;
    for (let ri = 0; ri < numRows; ri++) {
      // Go in reverse order so that closest connections are on top
      for (let ci = numColumns - 1; ci >= 0; ci--) {
        // Ignore diagonal / recurrent connections
        if (ri !== ci) {
          const weight = tm.subset(math.index(ri, ci));
          const key = `connection-${ri}-${ci}`;
          // How far away (by count of neurons) is our end?
          const targetDistance = Math.abs(ri - ci);
          const vertOffset = vertSpacing * targetDistance;
          const x = calcUnitX(ri, stageWidth, neuronSpacing, neuronRadius, numNeurons);

          let direction = ConnectionDirection.RIGHT;
          if (ci < ri) {
            direction = ConnectionDirection.LEFT;
          }
          const y = networkY - (neuronRadius * direction);
          const connectionHeight = (baseConnectionHeight + vertOffset) * direction;
          const endX = calcUnitX(ci, stageWidth, neuronSpacing, neuronRadius, numNeurons);
          let connection;
          const connectionProps = {
            startX: x,
            startY: y,
            endX,
            endY: y,
            height: connectionHeight,
            width: baseConnectionWidth,
            weight,
            key
          };
          if (direction === ConnectionDirection.RIGHT) {
            connection = (
              <ConnectionRight {...connectionProps} />
            );
          } else if (direction === ConnectionDirection.LEFT) {
            connection = (
              <ConnectionLeft {...connectionProps} />
            );
          }
          connections.push(connection);
        }
      }
    }
    return connections;
  }

  render() {
    return this.connections;
  }
}
