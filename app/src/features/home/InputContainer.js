import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Stage } from 'react-pixi-fiber';
import InputNeuron from './InputNeuron';
import * as actions from './redux/actions';


export class InputContainer extends Component {
  static propTypes = {
    home: PropTypes.shape({
      neuronSpacing: PropTypes.number.isRequired,
      neuronRadius: PropTypes.number.isRequired,
      iv: PropTypes.array.isRequired,
      updateDelay: PropTypes.number.isRequired
    }).isRequired,
  };

  get inputNeurons() {
    const { neuronSpacing, neuronRadius, iv, updateDelay } = this.props.home;
    const neurons = [];
    const startX = 200;
    const startY = 100;
    const spacing = neuronSpacing + (2 * neuronRadius);
    const fadeDuration = updateDelay / 3;
    for (let i = 0; i < iv.length; i++) {
      let active = false;
      if (iv[i] === 1) {
        active = true;
      }
      const key = `input-neuron-${i}`;
      const offset = spacing * i;
      const x = startX + offset;
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
    const stageOptions = {
      backgroundColor: 0xC7DAF2,
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
