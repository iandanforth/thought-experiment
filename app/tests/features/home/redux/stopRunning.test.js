import { expect } from 'chai';

import {
  HOME_STOP_RUNNING,
} from 'src/features/home/redux/constants';

import {
  stopRunning,
  reducer,
} from 'src/features/home/redux/stopRunning';

describe('home/redux/stopRunning', () => {
  it('returns correct action by stopRunning', () => {
    expect(stopRunning()).to.have.property('type', HOME_STOP_RUNNING);
  });

  it('handles action type HOME_STOP_RUNNING correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_STOP_RUNNING }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
