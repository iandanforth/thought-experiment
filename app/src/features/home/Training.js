import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import ConnectedNetworkContainer from './NetworkContainer';
import ConnectedInputContainer from './InputContainer';

export class Training extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="home-training">
        <div className="title-container">
          <div className="slide-title">
            STDP - based strengthening / weakening of connections following uni-direction sequential excitation
          </div>
        </div>
        <ConnectedNetworkContainer />
        <ConnectedInputContainer />
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
)(Training);
