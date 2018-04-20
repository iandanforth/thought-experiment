import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-rangeslider';
import classNames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { initInputVector } from '../../common/inputVector';

class Controls extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor() {
    super();

    this.startCycle = this.startCycle.bind(this);
    this.update = this.update.bind(this);
    this.reset = this.reset.bind(this);
    this.stop = this.stop.bind(this);
    this.getTransition = this.getTransition.bind(this);
    this.updateTimeout = null;
    this.propagationTimeout = null;
  }

  getTransition() {
    const { numNeurons, iv } = this.props.home;
    // If there are no elements that === 1, we get -1 back
    const prevIndex = iv.findIndex(el => el === 1);
    const nextIndex = (prevIndex + 1) % numNeurons;
    return [prevIndex, nextIndex];
  }

  getNextIV(nextIndex) {
    const { numNeurons } = this.props.home;
    const nextIV = initInputVector(numNeurons);
    nextIV[nextIndex] = 1;
    return nextIV;
  }

  feedForwardWithDelay(nextIV, prevIndex, nextIndex) {
    // TODO: Figure out principle of when to pull from props or get things passed in
    const { propagationDelay } = this.props.home;
    const { updateTransitionMatrix, updateNeuronVector } = this.props.actions;
    this.propagationTimeout = setTimeout(() => {
      if (this.props.home.running) {
        updateNeuronVector(nextIV);
        if (prevIndex !== -1) {
          updateTransitionMatrix(prevIndex, nextIndex);
        }
      }
    }, propagationDelay);
  }

  update() {
    const { running, updateDelay } = this.props.home;
    this.updateTimeout = setTimeout(this.update, updateDelay);
    // Keep checking but don't do anything if we're not running
    if (!running) { return; }
    const { updateInputVector } = this.props.actions;
    // For now we always advance to the next input being on in a repeating cycle
    const [prevIndex, nextIndex] = this.getTransition();
    const nextIV = this.getNextIV(nextIndex);
    updateInputVector(nextIV);
    // After propagationDelay we'll activate the neuron connected to the active input(s) in this timestep
    this.feedForwardWithDelay(nextIV, prevIndex, nextIndex);
  }

  reset() {
    const { resetTransitionMatrix, resetInputVector, resetNeuronVector } = this.props.actions;
    this.stop();
    resetTransitionMatrix();
    resetInputVector();
    resetNeuronVector();
  }

  startCycle() {
    const { running } = this.props.home;
    const { startRunning } = this.props.actions;
    // No-op if already running
    if (running) { return; }
    startRunning();
    // Don't start a second loop
    if (this.updateTimeout !== null) { return; }
    this.update();
  }

  stop() {
    const { stopRunning } = this.props.actions;
    if (this.updateTimeout !== null) {
      clearTimeout(this.updateTimeout);
      console.log(this.updateTimeout);
      this.updateTimeout = null;
    }
    if (this.propagationTimeout !== null) {
      clearTimeout(this.propagationTimeout);
      console.log(this.propagationTimeout);
      this.propagationTimeout = null;
    }
    stopRunning();
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
      stopRunning,
      resetTransitionMatrix
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
            <button onClick={this.startCycle}>Start</button>
            <button onClick={this.stop}>Stop</button>
          </div>
          <div>
            <button onClick={this.reset}>Reset</button>
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
