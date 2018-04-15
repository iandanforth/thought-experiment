import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-rangeslider';
import classNames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';


export class Controls extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    const { neuronSpacing, showSlider } = this.props.home;
    const { updateNeuronSpacing } = this.props.actions;

    const sliderClasses = classNames({
      'slider-container': true,
      hidden: !showSlider
    });

    return (
      <div className="home-controls">
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
