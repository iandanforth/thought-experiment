import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Stage } from 'react-pixi-fiber';
import { isEqual } from 'underscore';
import * as math from 'mathjs';
import * as PIXI from 'pixi.js';
import * as actions from './redux/actions';
import NetWrapper from './NetWrapper';
import ConnectedInputRow from './InputRow';
import Neuron from './Neuron';
import { ConnectionDirection } from './Connection';
import ConnectionRight from './ConnectionRight';
import ConnectionLeft from './ConnectionLeft';
import { getNextInputVector } from '../../common/inputVector';
import { getNextNeuronVector } from '../../common/neuronVector';
import { getNextTransitionMatrix } from '../../common/transitionMatrix';


export class NetworkContainer extends PureComponent {
  static propTypes = {
    home: PropTypes.shape({
      numNeurons: PropTypes.number.isRequired,
      nv: PropTypes.array.isRequired,
      iv: PropTypes.array.isRequired,
      inputDirection: PropTypes.number.isRequired,
      neuronSpacing: PropTypes.number.isRequired,
      neuronRadius: PropTypes.number.isRequired,
      baseConnectionHeight: PropTypes.number.isRequired,
      baseConnectionWidth: PropTypes.number.isRequired,
      tm: PropTypes.object.isRequired,
      updateDelay: PropTypes.number.isRequired,
      inputRunning: PropTypes.bool.isRequired,
      probeOnce: PropTypes.bool.isRequired,
      networkY: PropTypes.number.isRequired,
      stageWidth: PropTypes.number.isRequired
    }).isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.updateTimer = null;

    this.stepInput = this.stepInput.bind(this);
    this.tick = this.tick.bind(this);
    this.updateNetwork = this.updateNetwork.bind(this);
  }

  componentDidMount() {
    // Start ticker here
    const { updateDelay } = this.props.home;
    if (this.updateTimer === null) {
      this.updateTimer = setTimeout(this.tick, updateDelay);
    }
  }

  componentWillUnmount() {
    const { resetNeuronVector, resetInputVector, stopInputRunning } = this.props.actions;
    if (this.updateTimer !== null) {
      console.log('Cleaning up timer');
      clearInterval(this.updateTimer);
      this.updateTimer = null;
    }
    stopInputRunning();
    resetInputVector();
    resetNeuronVector();
  }

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

  stepInput() {
    const { iv, inputDirection } = this.props.home;
    const { updateInputVector } = this.props.actions;
    // For now we always advance to the next input being on in a repeating cycle
    const nextIV = getNextInputVector(iv, inputDirection);
    updateInputVector(nextIV);
    return nextIV;
  }

  tick() {
    const { inputRunning, updateDelay, probeOnce, iv } = this.props.home;
    const { disableProbe } = this.props.actions;

    // Special case where we want to probe the network with a single
    // 'flash' of an input
    // TODO: This is an ugly hack ... figure out something better
    if (probeOnce) {
      setTimeout(disableProbe, updateDelay / 2);
    }

    let nextIV = iv;
    if (inputRunning) {
      nextIV = this.stepInput();
    }
    this.updateNetwork(nextIV);

    this.updateTimer = setTimeout(this.tick, updateDelay);
  }

  // Updates both the neuron vector and the transition matrix
  updateNetwork(inputVector) {
    // ES6 absurdity: Asignment is right to left. prevNV is assigned value of nv.
    const { nv: prevNV, tm: prevTM } = this.props.home;
    const { updateFullNetwork } = this.props.actions;
    const nextNV = getNextNeuronVector(prevNV, inputVector, prevTM);
    if (!isEqual(prevNV, nextNV)) {
      const nextTM = getNextTransitionMatrix(prevTM, prevNV, nextNV);
      updateFullNetwork(nextNV, nextTM);
    }
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
      resolution: 2,
    };

    // Take control of rendering
    // See NetWrapper for new rendering loop
    stageOptions.autoStart = false;
    stageOptions.sharedTicker = true;
    const ticker = PIXI.ticker.shared;
    ticker.autoStart = false;
    ticker.stop();

    const { stageWidth } = this.props.home;

    return (
      <div className="home-network-container">
        <Stage height={500} width={stageWidth} options={stageOptions}>
          <NetWrapper>
            {this.connections}
            {this.neurons}
            <ConnectedInputRow />
          </NetWrapper>
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
