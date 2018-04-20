import { expect } from 'chai';

import {
  HOME_RESET_INPUT_VECTOR,
} from 'src/features/home/redux/constants';

import {
  resetInputVector,
  reducer,
} from 'src/features/home/redux/resetInputVector';

describe('home/redux/resetInputVector', () => {
  it('returns correct action by resetInputVector', () => {
    expect(resetInputVector()).to.have.property('type', HOME_RESET_INPUT_VECTOR);
  });

  it('handles action type HOME_RESET_INPUT_VECTOR correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_RESET_INPUT_VECTOR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
