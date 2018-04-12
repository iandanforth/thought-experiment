import { expect } from 'chai';

import {
  HOME_UPDATE_TRANSITION_MATRIX,
} from 'src/features/home/redux/constants';

import {
  updateTransitionMatrix,
  reducer,
} from 'src/features/home/redux/updateTransitionMatrix';

describe('home/redux/updateTransitionMatrix', () => {
  it('returns correct action by updateTransitionMatrix', () => {
    expect(updateTransitionMatrix()).to.have.property('type', HOME_UPDATE_TRANSITION_MATRIX);
  });

  it('handles action type HOME_UPDATE_TRANSITION_MATRIX correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_UPDATE_TRANSITION_MATRIX }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
