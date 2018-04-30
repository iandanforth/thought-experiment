import { expect } from 'chai';

import {
  HOME_UPDATE_SIM,
} from 'src/features/home/redux/constants';

import {
  updateSim,
  reducer,
} from 'src/features/home/redux/updateSim';

describe('home/redux/updateSim', () => {
  it('returns correct action by updateSim', () => {
    expect(updateSim()).to.have.property('type', HOME_UPDATE_SIM);
  });

  it('handles action type HOME_UPDATE_SIM correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_UPDATE_SIM }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
