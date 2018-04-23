import { expect } from 'chai';

import {
  HOME_START_INPUT_RUNNING,
} from 'src/features/home/redux/constants';

import {
  startInputRunning,
  reducer,
} from 'src/features/home/redux/startInputRunning';

describe('home/redux/startInputRunning', () => {
  it('returns correct action by startInputRunning', () => {
    expect(startInputRunning()).to.have.property('type', HOME_START_INPUT_RUNNING);
  });

  it('handles action type HOME_START_INPUT_RUNNING correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_START_INPUT_RUNNING }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
