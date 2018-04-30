import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import InputNeuron from './InputNeuron';
import * as actions from './redux/actions';


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
    const { neuronRadius, iv, updateDelay } = this.props.home;
    const neurons = [];
    const startY = 400;
    const fadeDuration = updateDelay / 3;
    for (let i = 0; i < iv.length; i++) {
      let active = false;
      if (iv[i] === 1) {
        active = true;
      }
      const key = `input-neuron-${i}`;
      const x = this.calcNeuronX(i);
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