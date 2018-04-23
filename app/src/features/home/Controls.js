import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-rangeslider';
import classNames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { getNextInputVector } from '../../common/inputVector';
import { getNextNeuronVector } from '../../common/neuronVector';
import { getNextTransitionMatrix } from '../../common/transitionMatrix';

export class Controls extends Component {
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
    const { running, inputRunning, updateDelay, iv } = this.props.home;
    // Queue the next update
    this.updateTimeout = setTimeout(this.updateSim, updateDelay);
    if (!running) { return; }
    let nextIV = iv;
    if (inputRunning) {
      nextIV = this.stepInput();
    }
    this.updateNetwork(nextIV);
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
    startInputRunning();
    startRunning();
    this.updateSim();
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
    const {
      neuronSpacing,
      neuronRadius,
      baseConnectionHeight,
      updateDelay
    } = this.props.home;
    const {
      updateNeuronSpacing,
      updateConnectionHeight,
      updateNeuronRadius,
      updateUpdateDelay,
      resetInputVector,
      startInputRunning,
      stopInputRunning
    } = this.props.actions;

    const sliderClasses = classNames({
      'slider-container': true
    });

    return (
      <div className="home-controls">
        <div className={sliderClasses}>
          <div className="slider-label">
            Neuron Spacing
          </div>
          <Slider
            min={0}
            max={200}
            step={1}
            value={neuronSpacing}
            tooltip={false}
            labels={{ 0: '0', 100: '100', 200: '200' }}
            onChange={updateNeuronSpacing}
          />
          <div className="slider-label">
            Connection Height
          </div>
          <Slider
            min={0}
            max={200}
            step={1}
            value={baseConnectionHeight}
            tooltip={false}
            labels={{ 0: '0', 100: '100', 200: '200' }}
            onChange={updateConnectionHeight}
          />
          <div className="slider-label">
            Neuron Radius
          </div>
          <Slider
            min={0}
            max={200}
            step={1}
            value={neuronRadius}
            tooltip={false}
            labels={{ 0: '0', 100: '100', 200: '200' }}
            onChange={updateNeuronRadius}
          />
          <div className="slider-label">
            Update Delay
          </div>
          <Slider
            min={100}
            max={1000}
            step={10}
            value={updateDelay}
            tooltip={false}
            labels={{ 100: 'Fast', 1000: 'Slow' }}
            onChange={updateUpdateDelay}
          />
        </div>
        <div className="buttons-container">
          <div>
            <button onClick={this.startSim}>Start Sim</button>
          </div>
          <div>
            <button onClick={this.stopSim}>Stop Sim</button>
          </div>
          <div>
            <button onClick={this.resetSim}>Reset Sim</button>
          </div>
          <div>
            <button onClick={startInputRunning}>Start Input</button>
          </div>
          <div>
            <button onClick={stopInputRunning}>Stop Input</button>
          </div>
          <div>
            <button onClick={resetInputVector}>Reset Input</button>
          </div>
          <div>
            <button onClick={this.stepInput}>Step Input</button>
          </div>
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
)(Controls);
