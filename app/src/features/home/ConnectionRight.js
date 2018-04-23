import React, { PureComponent } from 'react';
import { Connection } from './Connection';

export default class ConnectionRight extends PureComponent {
  static propTypes = {

  };

  connectionColor = 0xfc8c67;
  arrowCenterColor = 0xFF0094;
  arrowSize = 15;
  highlight = true;
  alpha = 1.0;

  render() {
    return (
      <Connection
        {...this.props}
        connectionColor={this.connectionColor}
        arrowCenterColor={this.arrowCenterColor}
        arrowSize={this.arrowSize}
        highlight={this.highlight}
        alpha={this.alpha}
      />
    );
  }
}
