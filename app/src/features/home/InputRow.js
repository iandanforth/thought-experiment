import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import InputNeuron from './InputNeuron';
import * as actions from './redux/actions';
import { calcUnitX } from '../../common/displayHelpers';


export class InputRow extends Component {
  static propTypes = {
    home: PropTypes.shape({
      numNeurons: PropTypes.number.isRequired,
      neuronSpacing: PropTypes.number.isRequired,
      neuronRadius: PropTypes.number.isRequired,
      iv: PropTypes.array.isRequired,
      updateDelay: PropTypes.number.isRequired,
      stageWidth: PropTypes.number.isRequired
    }).isRequired,
  };

  get inputNeurons() {
    const { stageWidth, neuronSpacing, neuronRadius, numNeurons, iv, updateDelay } = this.props.home;
    const neurons = [];
    const startY = 415;
    const fadeDuration = updateDelay / 3;
    for (let i = 0; i < iv.length; i++) {
      let active = false;
      if (iv[i] === 1) {
        active = true;
      }
      const key = `input-neuron-${i}`;
      const x = calcUnitX(i, stageWidth, neuronSpacing, neuronRadius, numNeurons);
      const y = startY;
      const neuron = (
        <InputNeuron
          x={x}
          y={y}
          radius={neuronRadius}
          key={key}
          active={active}
          fadeDuration={fadeDuration}
        />
      );
      neurons.push(neuron);
    }
    return neurons;
  }

  render() {
    return this.inputNeurons;
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
)(InputRow);
