import { Component } from 'react';
import Proptypes from 'prop-types';
import { throttle } from 'underscore';

export default class NetWrapper extends Component {
  static contextTypes = {
    app: Proptypes.object
  }

  static childContextTypes = {
    renderStage: Proptypes.func
  };

  constructor(props, context) {
    super(props);
    this.renderStage = throttle(() => {
      context.app.render();
    }, 20);
  }

  getChildContext() {
    return {
      renderStage: this.renderStage
    };
  }

  componentDidMount() {
    setTimeout(this.renderStage, 0);
  }

  componentDidUpdate() {
    setTimeout(this.renderStage, 0);
  }

  render() {
    return this.props.children;
  }
}
