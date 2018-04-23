import { expect } from 'chai';

import {
  HOME_STOP_INPUT_RUNNING,
} from 'src/features/home/redux/constants';

import {
  stopInputRunning,
  reducer,
} from 'src/features/home/redux/stopInputRunning';

describe('home/redux/stopInputRunning', () => {
  it('returns correct action by stopInputRunning', () => {
    expect(stopInputRunning()).to.have.property('type', HOME_STOP_INPUT_RUNNING);
  });

  it('handles action type HOME_STOP_INPUT_RUNNING correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_STOP_INPUT_RUNNING }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
