import { expect } from 'chai';

import {
  HOME_RESET_TRANSITION_MATRIX,
} from 'src/features/home/redux/constants';

import {
  resetTransitionMatrix,
  reducer,
} from 'src/features/home/redux/resetTransitionMatrix';

describe('home/redux/resetTransitionMatrix', () => {
  it('returns correct action by resetTransitionMatrix', () => {
    expect(resetTransitionMatrix()).to.have.property('type', HOME_RESET_TRANSITION_MATRIX);
  });

  it('handles action type HOME_RESET_TRANSITION_MATRIX correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_RESET_TRANSITION_MATRIX }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
