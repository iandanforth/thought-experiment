import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Stage } from 'react-pixi-fiber';
import { Neuron, NeuronState } from './Neuron';
import * as actions from './redux/actions';


class InputContainer extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  get inputNeurons() {
    const { numNeurons, neuronSpacing, neuronRadius, iv } = this.props.home;
    const neurons = [];
    const startX = 200;
    const startY = 100;
    const spacing = neuronSpacing + (2 * neuronRadius);

    for (let i = 0; i < numNeurons; i++) {
      let neuronState = NeuronState.OFF_INPUT;
      if (iv[i] === 1) {
        neuronState = NeuronState.ON_INPUT;
      }
      const key = `input-neuron-${i}`;
      const offset = spacing * i;
      const x = startX + offset;
      const y = startY;
      const neuron = (
        <Neuron
          x={x}
          y={y}
          radius={neuronRadius}
          key={key}
          neuronState={neuronState}
        />
      );
      neurons.push(neuron);
    }
    return neurons;
  }

  render() {
    const stageOptions = {
      backgroundColor: 0xFFFFFF,
      antialias: true,
      resolution: 2
    };
    return (
      <div className="home-input-container">
        <Stage height={200} width={800} options={stageOptions}>
          {this.inputNeurons}
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
)(InputContainer);
