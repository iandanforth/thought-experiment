import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-rangeslider';
import classNames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';


class Controls extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor() {
    super();

    this.startCycle = this.startCycle.bind(this);
  }

  startCycle() {
    const { iv } = this.props.home;
    const { updateInputVector } = this.props.actions;

    setTimeout(() => {
      console.log('Lunch time!');
      this.startCycle();
    }, 1000);
  }

  render() {
    const { neuronSpacing, neuronRadius, showSlider, baseConnectionHeight } = this.props.home;
    const {
      updateNeuronSpacing,
      updateConnectionHeight,
      updateNeuronRadius,
      updateInputVector,
    } = this.props.actions;
    const connectionHeight = baseConnectionHeight;

    const sliderClasses = classNames({
      'slider-container': true,
      hidden: !showSlider
    });

    return (
      <div className="home-controls">
        <div>
          Network Display controls
        </div>
        <div className={sliderClasses}>
          <Slider
            min={0}
            max={200}
            step={1}
            value={neuronSpacing}
            tooltip={false}
            labels={{ 0: '0', 100: '100', 200: '200' }}
            onChange={updateNeuronSpacing}
          />
          <Slider
            min={0}
            max={200}
            step={1}
            value={connectionHeight}
            tooltip={false}
            labels={{ 0: '0', 100: '100', 200: '200' }}
            onChange={updateConnectionHeight}
          />
          <Slider
            min={0}
            max={200}
            step={1}
            value={neuronRadius}
            tooltip={false}
            labels={{ 0: '0', 100: '100', 200: '200' }}
            onChange={updateNeuronRadius}
          />
        </div>
        <div className="buttons-container">
          <button onClick={this.startCycle}>Play</button>
        </div>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    home: state.home,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Controls);
