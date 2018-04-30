import { expect } from 'chai';

import {
  HOME_UPDATE_FULL_NETWORK,
} from 'src/features/home/redux/constants';

import {
  updateFullNetwork,
  reducer,
} from 'src/features/home/redux/updateFullNetwork';

describe('home/redux/updateFullNetwork', () => {
  it('returns correct action by updateFullNetwork', () => {
    expect(updateFullNetwork()).to.have.property('type', HOME_UPDATE_FULL_NETWORK);
  });

  it('handles action type HOME_UPDATE_FULL_NETWORK correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_UPDATE_FULL_NETWORK }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
