import { expect } from 'chai';

import {
  HOME_UPDATE_NEURON_VECTOR,
} from 'src/features/home/redux/constants';

import {
  updateNeuronVector,
  reducer,
} from 'src/features/home/redux/updateNeuronVector';

describe('home/redux/updateNeuronVector', () => {
  it('returns correct action by updateNeuronVector', () => {
    expect(updateNeuronVector()).to.have.property('type', HOME_UPDATE_NEURON_VECTOR);
  });

  it('handles action type HOME_UPDATE_NEURON_VECTOR correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_UPDATE_NEURON_VECTOR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
