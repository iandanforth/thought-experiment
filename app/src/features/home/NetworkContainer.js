import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Stage } from 'react-pixi-fiber';
import * as math from 'mathjs';
import * as actions from './redux/actions';
import Neuron from './Neuron';
import { ConnectionDirection } from './Connection';
import ConnectionRight from './ConnectionRight';
import ConnectionLeft from './ConnectionLeft';

export class NetworkContainer extends Component {
  static propTypes = {
    home: PropTypes.shape({
      numNeurons: PropTypes.number.isRequired,
      nv: PropTypes.array.isRequired,
      neuronSpacing: PropTypes.number.isRequired,
      neuronRadius: PropTypes.number.isRequired,
      baseConnectionHeight: PropTypes.number.isRequired,
      baseConnectionWidth: PropTypes.number.isRequired,
      tm: PropTypes.object.isRequired,
      updateDelay: PropTypes.number.isRequired,
      networkY: PropTypes.number.isRequired,
      stageWidth: PropTypes.number.isRequired
    }).isRequired,
    actions: PropTypes.object.isRequired,
  };

  // TODO: Make neuron position relative to center of stage
  get neurons() {
    const { nv, neuronRadius, networkY, updateDelay } = this.props.home;
    const neurons = [];
    const fadeDuration = updateDelay / 3;
    for (let i = nv.length - 1; i >= 0; i--) {
      let active = false;
      if (nv[i] === 1) {
        active = true;
      }
      const key = `neuron-${i}`;
      const x = this.calcNeuronX(i);
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
      neuronRadius,
      baseConnectionHeight,
      baseConnectionWidth,
      tm,
      networkY
    } = this.props.home;

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
          const x = this.calcNeuronX(ri);

          let direction = ConnectionDirection.RIGHT;
          if (ci < ri) {
            direction = ConnectionDirection.LEFT;
          }
          const y = networkY - (neuronRadius * direction);
          const connectionHeight = (baseConnectionHeight + vertOffset) * direction;
          const endX = this.calcNeuronX(ci);
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

  calcNeuronX(index) {
    const { stageWidth, neuronSpacing, neuronRadius, numNeurons } = this.props.home;
    const stageCenter = stageWidth / 2;
    const middleNeuron = (numNeurons / 2) - 0.5; // 0 based
    const neuronOffest = index - middleNeuron;
    const spacing = neuronSpacing + (2 * neuronRadius);
    const offset = spacing * neuronOffest;
    const neuronX = stageCenter + offset;
    return neuronX;
  }

  render() {
    const stageOptions = {
      backgroundColor: 0xC7DAF2,
      antialias: true,
      resolution: 2
    };

    const { stageWidth } = this.props.home;

    return (
      <div className="home-network-container">
        <Stage height={350} width={stageWidth} options={stageOptions}>
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
