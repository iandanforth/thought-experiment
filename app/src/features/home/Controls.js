import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-rangeslider';
import { range } from 'underscore';
import Dropdown from 'react-dropdown';
import assert from 'assert';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

import { INPUT_DIRECTION } from '../../common/inputVector';

export class Controls extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.handleNeuronGroupCountSelect = this.handleNeuronGroupCountSelect.bind(this);
    this.handleSequenceDirectionSelect = this.handleSequenceDirectionSelect.bind(this);
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

  handleSequenceDirectionSelect(selection) {
    assert.ok(
      Object.prototype.hasOwnProperty.call(selection, 'value'),
      'Selection must be an object with a property "value".'
    );
    const { updateInputDirection } = this.props.actions;
    updateInputDirection(selection.value);
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

    const { numNeurons, inputDirection } = this.props.home;
    /* eslint-disable-next-line arrow-body-style */
    const nnDropdownOptions = range(2, 13).map((val) => {
      return { value: val, label: `${val}` };
    });
    const nnOptionsInd = nnDropdownOptions.findIndex(item => item.value === numNeurons);
    const nnDropdownValue = nnDropdownOptions[nnOptionsInd];

    // Sequence direction
    const sdDropdownOptions = [
      { value: INPUT_DIRECTION.RIGHT, label: 'Left to Right' },
      { value: INPUT_DIRECTION.LEFT, label: 'Right to Left' }
    ];
    const sdOptionsInd = sdDropdownOptions.findIndex(item => item.value === inputDirection);
    const sdDropdownValue = sdDropdownOptions[sdOptionsInd];

    return (
      <div className="home-controls">
        <div className="slider-container">
          <div className="control-label">
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
        </div>
        <div className="dropdowns-container">
          <div className="control-label">
            Neuron Groups
          </div>
          <Dropdown
            options={nnDropdownOptions}
            onChange={this.handleNeuronGroupCountSelect}
            value={nnDropdownValue}
            placeholder="Select an option"
          />
          <div className="control-label">
            Sequence Direction
          </div>
          <Dropdown
            options={sdDropdownOptions}
            onChange={this.handleSequenceDirectionSelect}
            value={sdDropdownValue}
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
