import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import ConnectedNetworkContainer from './NetworkContainer';
import ConnectedNetworkControlButtons from './NetworkControlButtons';

export class Simulation extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="home-simulation">
        <div className="title-container">
          <div className="slide-title">
            STDP - based strengthening / weakening of connections following uni-direction sequential excitation
          </div>
        </div>
        <ConnectedNetworkContainer />
        <ConnectedNetworkControlButtons />
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
)(Simulation);
