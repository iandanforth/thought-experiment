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
    this.updateTimeout = null;
  }

  getNextIV() {
    const { iv, numNeurons } = this.props.home;
    // If there are no elements that === 1, we get -1 back which still works.
    const prevIndex = iv.findIndex(el => el === 1);
    const nextIndex = (prevIndex + 1) % numNeurons;
    const nextIV = initInputVector(numNeurons);
    nextIV[nextIndex] = 1;
    return nextIV;
  }

  update() {
    const { running, updateDelay } = this.props.home;
    this.updateTimeout = setTimeout(this.update, updateDelay);
    // Keep checking but don't do anything if we're not running
    if (!running) { return; }
    const { updateInputVector } = this.props.actions;
    const nextIV = this.getNextIV();
    updateInputVector(nextIV);
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

  render() {
    const {
      neuronSpacing,
      neuronRadius,
      showSlider,
      baseConnectionHeight,
      updateDelay
    } = this.props.home;
    const {
      updateNeuronSpacing,
      updateConnectionHeight,
      updateNeuronRadius,
      updateUpdateDelay,
      stopRunning
    } = this.props.actions;
    const connectionHeight = baseConnectionHeight;

    const sliderClasses = classNames({
      'slider-container': true,
      hidden: !showSlider
    });

    return (
      <div className="home-controls">
        <div className={sliderClasses}>
          Neuron Spacing
          <Slider
            min={0}
            max={200}
            step={1}
            value={neuronSpacing}
            tooltip={false}
            labels={{ 0: '0', 100: '100', 200: '200' }}
            onChange={updateNeuronSpacing}
          />
          Connection Height
          <Slider
            min={0}
            max={200}
            step={1}
            value={connectionHeight}
            tooltip={false}
            labels={{ 0: '0', 100: '100', 200: '200' }}
            onChange={updateConnectionHeight}
          />
          Neuron Radius
          <Slider
            min={0}
            max={200}
            step={1}
            value={neuronRadius}
            tooltip={false}
            labels={{ 0: '0', 100: '100', 200: '200' }}
            onChange={updateNeuronRadius}
          />
          Update Delay
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
          <button onClick={this.startCycle}>Start</button>
          <button onClick={stopRunning}>Stop</button>
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
