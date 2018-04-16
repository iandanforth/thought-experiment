import { expect } from 'chai';

import {
  HOME_UPDATE_UPDATE_DELAY,
} from 'src/features/home/redux/constants';

import {
  updateUpdateDelay,
  reducer,
} from 'src/features/home/redux/updateUpdateDelay';

describe('home/redux/updateUpdateDelay', () => {
  it('returns correct action by updateUpdateDelay', () => {
    expect(updateUpdateDelay()).to.have.property('type', HOME_UPDATE_UPDATE_DELAY);
  });

  it('handles action type HOME_UPDATE_UPDATE_DELAY correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_UPDATE_UPDATE_DELAY }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
