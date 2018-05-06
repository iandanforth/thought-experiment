import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-rangeslider';
import classNames from 'classnames';
import Dropdown from 'react-dropdown';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class Controls extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    const {
      neuronSpacing,
      neuronRadius,
      baseConnectionHeight,
      updateDelay
    } = this.props.home;
    const {
      updateNeuronSpacing,
      updateConnectionHeight,
      updateNeuronRadius,
      updateUpdateDelay,
    } = this.props.actions;

    const sliderClasses = classNames({
      'slider-container': true
    });

    return (
      <div className="home-controls">
        <div className={sliderClasses}>
          {// <div className="slider-label">
          //   Neuron Spacing
          // </div>
          // <Slider
          //   min={0}
          //   max={200}
          //   step={1}
          //   value={neuronSpacing}
          //   tooltip={false}
          //   labels={{ 0: '0', 100: '100', 200: '200' }}
          //   onChange={updateNeuronSpacing}
          // />
          // <div className="slider-label">
          //   Connection Height
          // </div>
          // <Slider
          //   min={0}
          //   max={200}
          //   step={1}
          //   value={baseConnectionHeight}
          //   tooltip={false}
          //   labels={{ 0: '0', 100: '100', 200: '200' }}
          //   onChange={updateConnectionHeight}
          // />
          // <div className="slider-label">
          //   Neuron Radius
          // </div>
          // <Slider
          //   min={0}
          //   max={200}
          //   step={1}
          //   value={neuronRadius}
          //   tooltip={false}
          //   labels={{ 0: '0', 100: '100', 200: '200' }}
          //   onChange={updateNeuronRadius}
          // />
          }
          <div className="slider-label">
            Simulation Speed
          </div>
          <Slider
            min={200}
            max={1000}
            step={10}
            value={updateDelay}
            tooltip={false}
            labels={{ 200: 'Fast', 1000: 'Slow' }}
            onChange={updateUpdateDelay}
          />
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
