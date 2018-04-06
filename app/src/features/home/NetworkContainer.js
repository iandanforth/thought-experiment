import React, { Component } from 'react';
import Neuron from './Neuron';
import Connection from './Connection';

export default class NetworkContainer extends Component {
  static propTypes = {

  };

  render() {
    return (
      <div className="home-network-container">
        Component content: home/NetworkContainer
        <Neuron />
        <Connection />
      </div>
    );
  }
}
