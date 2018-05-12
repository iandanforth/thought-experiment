import React, { Component } from 'react';
import UnitRow from './UnitRow';
import InputNeuron from './InputNeuron';

export default class InputRow extends Component {
  static propTypes = {
  };

  startY = 415;
  unitClass = InputNeuron

  render() {
    return (
      <UnitRow
        {...this.props}
        startY={this.startY}
        UnitClass={this.unitClass}
      />
    );
  }
}
