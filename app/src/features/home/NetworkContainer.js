import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Stage } from 'react-pixi-fiber';
import * as math from 'mathjs';
import * as actions from './redux/actions';
import Neuron from './Neuron';
import { Connection, ConnectionDirection } from './Connection';

class NetworkContainer extends Component {
  static propTypes = {
    home: PropTypes.shape({
      nv: PropTypes.array.isRequired,
      neuronSpacing: PropTypes.number.isRequired,
      neuronRadius: PropTypes.number.isRequired,
      baseConnectionHeight: PropTypes.number.isRequired,
      tm: PropTypes.object.isRequired,
      updateDelay: PropTypes.number.isRequired,
      networkX: PropTypes.number.isRequired,
      networkY: PropTypes.number.isRequired
    }).isRequired,
    actions: PropTypes.object.isRequired,
  };

  get neurons() {
    const { nv, neuronSpacing, neuronRadius, networkX, networkY, updateDelay } = this.props.home;
    const neurons = [];
    const spacing = neuronSpacing + (2 * neuronRadius);
    const fadeDuration = updateDelay / 3;
    for (let i = nv.length - 1; i >= 0; i--) {
      let active = false;
      if (nv[i] === 1) {
        active = true;
      }
      const key = `neuron-${i}`;
      const offset = spacing * i;
      const x = networkX + offset;
      const y = networkY;
      const neuron = (
        <Neuron
          x={x}
          y={y}
          radius={neuronRadius}
          inactiveColor="rgb(212, 225, 246)"
          active={active}
          fadeDuration={fadeDuration}
          key={key}
        />
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
      tm,
      networkX,
      networkY
    } = this.props.home;

    const [numRows, numColumns] = tm.size();

    const connections = [];
    const spacing = neuronSpacing + (2 * neuronRadius);
    const vertSpacing = 30;

    for (let ri = 0; ri < numRows; ri++) {
      for (let ci = 0; ci < numColumns; ci++) {
        // Ignore diagonal / recurrent connections
        if (ri !== ci) {
          const weight = tm.subset(math.index(ri, ci));
          const key = `connection-${ri}-${ci}`;
          const startOffset = spacing * ri;
          // How far away (by count of neurons) is our end?
          const targetDistance = Math.abs(ri - ci);
          const endOffset = spacing * targetDistance;
          const vertOffset = vertSpacing * targetDistance;
          const x = networkX + startOffset;

          let direction = ConnectionDirection.RIGHT;
          if (ci < ri) {
            direction = ConnectionDirection.LEFT;
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
              direction={direction}
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
      backgroundColor: 0xC7DAF2,
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

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    home: state.home,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NetworkContainer);
