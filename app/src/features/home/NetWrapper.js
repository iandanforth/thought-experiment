import { PureComponent } from 'react';
import Proptypes from 'prop-types';


export default class NetWrapper extends PureComponent {
  static contextTypes = {
    app: Proptypes.object
  }

  static childContextTypes = {
    renderStage: Proptypes.func
  };

  constructor(props) {
    super(props);
    this.stageNeedsRender = false;
    this.renderStage = this.renderStage.bind(this);
    this.tick = this.tick.bind(this);
    this.raf = null;
  }

  getChildContext() {
    return {
      renderStage: this.renderStage
    };
  }

  componentDidMount() {
    this.renderStage();
    this.tick();
  }

  componentDidUpdate() {
    this.renderStage();
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.raf);
    this.stageNeedsRender = false;
  }

  // This externalizes the standard PIXI ticker for greater control
  tick() {
    if (this.stageNeedsRender) {
      this.context.app.render();
      this.stageNeedsRender = false;
    }
    this.raf = window.requestAnimationFrame(this.tick);
  }

  renderStage() {
    // Don't invoke setState as we're managing pixi re-render not React
    this.stageNeedsRender = true;
  }

  render() {
    return this.props.children;
  }
}
