import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as math from 'mathjs';
import * as actions from './redux/actions';
import NetworkContainer from './NetworkContainer';
import InputContainer from './InputContainer';

export class TestPage extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentDidMount() {
    // const { updateTransitionMatrix } = this.props.actions;
    // updateTransitionMatrix(1, 2);
  }

  render() {
    const {
      numNeurons,
      neuronSpacing,
      neuronRadius,
      baseConnectionHeight,
      tm,
    } = this.props.home;
    return (
      <div className="home-test-page">
        <NetworkContainer
          numNeurons={numNeurons}
          weights={tm}
          neuronSpacing={neuronSpacing}
          neuronRadius={neuronRadius}
          baseConnectionHeight={baseConnectionHeight}
        />
        <InputContainer />
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
