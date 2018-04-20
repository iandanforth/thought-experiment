import React, { Component } from 'react';
import { Connection } from './Connection';

export default class ConnectionLeft extends Component {
  static propTypes = {

  };

  render() {
    return (
      <Connection
        {...this.props}
      />
    );
  }
}
