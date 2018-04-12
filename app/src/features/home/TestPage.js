import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as math from 'mathjs';
import * as actions from './redux/actions';
import NetworkContainer from './NetworkContainer';
import InputContainer from './InputContainer';
import Controls from './Controls';

export class TestPage extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const { updateTransitionMatrix } = this.props.actions;
    updateTransitionMatrix(1, 2);
  }

  render() {
    const { numNeurons, numInputNeurons, tm } = this.props.home;
    console.log(tm);
    return (
      <div className="home-test-page">
        Page Content: home/TestPage1
        <NetworkContainer numNeurons={numNeurons} weights={tm} />
        <InputContainer numNeurons={numInputNeurons} />
        <Controls />
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
)(TestPage);
