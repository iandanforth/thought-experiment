import { expect } from 'chai';

import {
  HOME_UPDATE_NEURON_RADIUS,
} from 'src/features/home/redux/constants';

import {
  updateNeuronRadius,
  reducer,
} from 'src/features/home/redux/updateNeuronRadius';

describe('home/redux/updateNeuronRadius', () => {
  it('returns correct action by updateNeuronRadius', () => {
    expect(updateNeuronRadius()).to.have.property('type', HOME_UPDATE_NEURON_RADIUS);
  });

  it('handles action type HOME_UPDATE_NEURON_RADIUS correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_UPDATE_NEURON_RADIUS }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
