import React, { PureComponent } from 'react';
import { Connection } from './Connection';

export default class ConnectionLeft extends PureComponent {
  static propTypes = {

  };

  connectionColor = 0x66D2F8;
  arrowCenterColor = 0x5D00E6;
  aboveThresholdColor = 0x52caf2;
  arrowSize = 20;
  highlight = false;
  alpha = 0.7;

  render() {
    return (
      <Connection
        {...this.props}
        connectionColor={this.connectionColor}
        arrowCenterColor={this.arrowCenterColor}
        aboveThresholdColor={this.aboveThresholdColor}
        arrowSize={this.arrowSize}
        highlight={this.highlight}
        alpha={this.alpha}
      />
    );
  }
}
