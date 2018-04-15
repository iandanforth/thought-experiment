import { expect } from 'chai';

import {
  HOME_UPDATE_NEURON_SPACING,
} from 'src/features/home/redux/constants';

import {
  updateNeuronSpacing,
  reducer,
} from 'src/features/home/redux/updateNeuronSpacing';

describe('home/redux/updateNeuronSpacing', () => {
  it('returns correct action by updateNeuronSpacing', () => {
    expect(updateNeuronSpacing()).to.have.property('type', HOME_UPDATE_NEURON_SPACING);
  });

  it('handles action type HOME_UPDATE_NEURON_SPACING correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_UPDATE_NEURON_SPACING }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
