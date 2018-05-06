import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-rangeslider';
import classNames from 'classnames';
import Dropdown from 'react-dropdown';
import assert from 'assert';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class Controls extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.handleNeuronGroupCountSelect = this.handleNeuronGroupCountSelect.bind(this);
  }

  handleNeuronGroupCountSelect(selection) {
    assert.ok(
      Object.prototype.hasOwnProperty.call(selection, 'value'),
      'Selection must be an object with a property "value".'
    );
    const {
      updateNumNeurons,
      stopInputRunning,
      resetInputVector,
      resetTransitionMatrix,
      resetNeuronVector
    } = this.props.actions;
    // Reset everything
    stopInputRunning();
    updateNumNeurons(selection.value);
    resetInputVector();
    resetNeuronVector();
    resetTransitionMatrix();
  }

  render() {
    const {
      // neuronSpacing,
      // neuronRadius,
      // baseConnectionHeight,
      updateDelay
    } = this.props.home;
    const {
      // updateNeuronSpacing,
      // updateConnectionHeight,
      // updateNeuronRadius,
      updateUpdateDelay,
    } = this.props.actions;
    const sliderClasses = classNames({
      'slider-container': true
    });

    const { numNeurons } = this.props.home;
    const dropdownOptions = [
      { value: 8, label: '8' },
      { value: 9, label: '9' },
      { value: 10, label: '10' },
      { value: 11, label: '11' },
      { value: 12, label: '12' }
    ];
    const dropdownValueIndex = dropdownOptions.findIndex(item => item.value === numNeurons);
    const dropdownValue = dropdownOptions[dropdownValueIndex];

    return (
      <div className="home-controls">
        <div className={sliderClasses}>
          {// <div className="slider-label">
          //   Neuron Spacing
          // </div>
          // <Slider
          //   min={0}
          //   max={200}
          //   step={1}
          //   value={neuronSpacing}
          //   tooltip={false}
          //   labels={{ 0: '0', 100: '100', 200: '200' }}
          //   onChange={updateNeuronSpacing}
          // />
          // <div className="slider-label">
          //   Connection Height
          // </div>
          // <Slider
          //   min={0}
          //   max={200}
          //   step={1}
          //   value={baseConnectionHeight}
          //   tooltip={false}
          //   labels={{ 0: '0', 100: '100', 200: '200' }}
          //   onChange={updateConnectionHeight}
          // />
          // <div className="slider-label">
          //   Neuron Radius
          // </div>
          // <Slider
          //   min={0}
          //   max={200}
          //   step={1}
          //   value={neuronRadius}
          //   tooltip={false}
          //   labels={{ 0: '0', 100: '100', 200: '200' }}
          //   onChange={updateNeuronRadius}
          // />
          }
          <div className="slider-label">
            Simulation Speed
          </div>
          <Slider
            min={200}
            max={1000}
            step={10}
            value={updateDelay}
            tooltip={false}
            labels={{ 200: 'Fast', 1000: 'Slow' }}
            onChange={updateUpdateDelay}
          />
          <div className="slider-label">
            Neuron Groups
          </div>
          <Dropdown
            options={dropdownOptions}
            onChange={this.handleNeuronGroupCountSelect}
            value={dropdownValue}
            placeholder="Select an option"
          />
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
