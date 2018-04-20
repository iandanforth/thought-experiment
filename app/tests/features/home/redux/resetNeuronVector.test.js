import { expect } from 'chai';

import {
  HOME_RESET_NEURON_VECTOR,
} from 'src/features/home/redux/constants';

import {
  resetNeuronVector,
  reducer,
} from 'src/features/home/redux/resetNeuronVector';

describe('home/redux/resetNeuronVector', () => {
  it('returns correct action by resetNeuronVector', () => {
    expect(resetNeuronVector()).to.have.property('type', HOME_RESET_NEURON_VECTOR);
  });

  it('handles action type HOME_RESET_NEURON_VECTOR correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_RESET_NEURON_VECTOR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
