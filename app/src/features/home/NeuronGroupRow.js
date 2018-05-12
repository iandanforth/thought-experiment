import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UnitRow from './UnitRow';
import Neuron from './Neuron';

export default class NeuronGroupRow extends Component {
  static propTypes = {
    networkY: PropTypes.number.isRequired,
    nv: PropTypes.array.isRequired
  };

  unitClass = Neuron;

  render() {
    console.log('Render NeuronGroupRow');
    return (
      <UnitRow
        {...this.props}
        startY={this.props.networkY}
        unitActivations={this.props.nv}
        UnitClass={this.unitClass}
      />
    );
  }
}
