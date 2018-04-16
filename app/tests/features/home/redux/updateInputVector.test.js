import { expect } from 'chai';

import {
  HOME_UPDATE_INPUT_VECTOR,
} from 'src/features/home/redux/constants';

import {
  updateInputVector,
  reducer,
} from 'src/features/home/redux/updateInputVector';

describe('home/redux/updateInputVector', () => {
  it('returns correct action by updateInputVector', () => {
    expect(updateInputVector()).to.have.property('type', HOME_UPDATE_INPUT_VECTOR);
  });

  it('handles action type HOME_UPDATE_INPUT_VECTOR correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_UPDATE_INPUT_VECTOR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
