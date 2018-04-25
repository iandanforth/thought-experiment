import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { getNextInputVector } from '../../common/inputVector';
import { getNextNeuronVector } from '../../common/neuronVector';
import { getNextTransitionMatrix } from '../../common/transitionMatrix';

export class NetworkControlButtons extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor() {
    super();

    this.startSim = this.startSim.bind(this);
    this.stopSim = this.stopSim.bind(this);
    this.updateSim = this.updateSim.bind(this);
    this.resetSim = this.resetSim.bind(this);
    this.resetInput = this.resetInput.bind(this);
    this.stepInput = this.stepInput.bind(this);
    this.updateTimeout = null;
  }

  // Updates both the neuron vector and the transition matrix
  updateNetwork(inputVector) {
    // ES6 absurdity asignment is right to left. prevNV is assigned value of nv.
    const { nv: prevNV, tm: prevTM } = this.props.home;
    const { updateNeuronVector, updateTransitionMatrix } = this.props.actions;
    // Our neuron vector is now up to date
    const nextNV = getNextNeuronVector(prevNV, inputVector, prevTM);
    updateNeuronVector(nextNV);
    const nextTM = getNextTransitionMatrix(prevTM, prevNV, nextNV);
    updateTransitionMatrix(nextTM);
  }

  updateSim() {
    const { running, inputRunning, updateDelay, iv, probeOnce } = this.props.home;
    const { disableProbe } = this.props.actions;

    // Special case where we want to probe the network with a single
    // 'flash' of an input
    // TODO: This is an ugly hack ... figure out something better
    if (probeOnce) {
      disableProbe();
    }

    // Queue the next update
    this.updateTimeout = setTimeout(this.updateSim, updateDelay);
    if (!running) { return; }
    let nextIV = iv;
    if (inputRunning) {
      nextIV = this.stepInput();
    }
    this.updateNetwork(nextIV);
  }

  resetInput() {
    const { stopInputRunning, resetInputVector } = this.props.actions;
    stopInputRunning();
    resetInputVector();
  }

  stepInput() {
    const { iv } = this.props.home;
    const { updateInputVector } = this.props.actions;
    // For now we always advance to the next input being on in a repeating cycle
    const nextIV = getNextInputVector(iv);
    updateInputVector(nextIV);
    return nextIV;
  }

  startSim() {
    const { startRunning, startInputRunning } = this.props.actions;
    startRunning();
    // Don't start a second loop
    if (this.updateTimeout === null) {
      this.updateSim();
    }
    startInputRunning();
  }

  stopSim() {
    const { stopRunning, stopInputRunning } = this.props.actions;
    stopRunning();
    stopInputRunning();
    if (this.updateTimeout !== null) {
      clearTimeout(this.updateTimeout);
      this.updateTimeout = null;
    }
  }

  resetSim() {
    const { resetTransitionMatrix, resetInputVector, resetNeuronVector } = this.props.actions;
    this.stopSim();
    resetTransitionMatrix();
    resetInputVector();
    resetNeuronVector();
  }

  render() {
    const { enableProbe, resetNeuronVector } = this.props.actions;
    return (
      <div className="home-network-control-buttons">
        <div className="buttons-container">
          <button onClick={this.startSim}>Start Simulation</button>
          <button onClick={this.resetInput}>Stop Input</button>
          <button onClick={enableProbe}>Probe</button>
          <button onClick={resetNeuronVector}>Reset Neurons</button>
        </div>
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
)(NetworkControlButtons);
