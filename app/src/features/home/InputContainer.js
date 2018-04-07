import React, { Component } from 'react';
import Neuron from './Neuron';

export default class InputContainer extends Component {
  static propTypes = {

  };

  render() {
    return (
      <div className="home-input-container">
        Component content: home/InputContainer
        <Neuron />
      </div>
    );
  }
}
