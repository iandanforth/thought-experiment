import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UnitRow from './UnitRow';
import InputNeuron from './InputNeuron';

export default class InputRow extends Component {
  static propTypes = {
    iv: PropTypes.array.isRequired
  };

  startY = 415;
  unitClass = InputNeuron

  render() {
    return (
      <UnitRow
        {...this.props}
        startY={this.startY}
        unitActivations={this.props.iv}
        UnitClass={this.unitClass}
      />
    );
  }
}
