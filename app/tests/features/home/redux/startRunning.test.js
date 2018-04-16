import { expect } from 'chai';

import {
  HOME_START_RUNNING,
} from 'src/features/home/redux/constants';

import {
  startRunning,
  reducer,
} from 'src/features/home/redux/startRunning';

describe('home/redux/startRunning', () => {
  it('returns correct action by startRunning', () => {
    expect(startRunning()).to.have.property('type', HOME_START_RUNNING);
  });

  it('handles action type HOME_START_RUNNING correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_START_RUNNING }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
