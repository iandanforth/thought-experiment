import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class NetworkControlButtons extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor() {
    super();

    this.stopSim = this.stopSim.bind(this);
    this.resetSim = this.resetSim.bind(this);
    this.resetInput = this.resetInput.bind(this);
  }

  resetInput() {
    const { stopInputRunning, resetInputVector } = this.props.actions;
    resetInputVector();
    stopInputRunning();
  }

  stopSim() {
    const { stopInputRunning, resetNeuronVector } = this.props.actions;
    stopInputRunning();
    resetNeuronVector();
  }

  resetSim() {
    const { resetTransitionMatrix, resetInputVector } = this.props.actions;
    this.stopSim();
    resetTransitionMatrix();
    resetInputVector();
  }

  render() {
    const { running, inputRunning } = this.props.home;
    const { enableProbe, resetNeuronVector, startInputRunning } = this.props.actions;

    // Stop/Start Input button
    const inputButtonText = inputRunning ? 'Stop Input' : 'Start Input';
    const inputButtonCB = inputRunning ? this.resetInput : startInputRunning;

    // Single Input button
    const siDisabled = inputRunning;

    return (
      <div className="home-network-control-buttons">
        <div className="buttons-container">
          <button onClick={inputButtonCB} >{inputButtonText}</button>
          <button onClick={resetNeuronVector} >Silence Neurons</button>
          <button onClick={enableProbe} disabled={siDisabled}>Single Input</button>
          <button onClick={this.resetSim}>Reset Simulation</button>
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
)(NetworkControlButtons);
