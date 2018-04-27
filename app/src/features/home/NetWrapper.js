import React, { Component } from 'react';
import Proptypes from 'prop-types';

export default class NetWrapper extends Component {
  static contextTypes = {
    app: Proptypes.object
  }

  static propTypes = {

  };

  componentDidUpdate() {
    this.context.app.render();
  }

  render() {
    return this.props.children;
  }
}
