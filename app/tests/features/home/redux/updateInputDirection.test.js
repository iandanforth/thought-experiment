import { expect } from 'chai';

import {
  HOME_UPDATE_INPUT_DIRECTION,
} from 'src/features/home/redux/constants';

import {
  updateInputDirection,
  reducer,
} from 'src/features/home/redux/updateInputDirection';

describe('home/redux/updateInputDirection', () => {
  it('returns correct action by updateInputDirection', () => {
    expect(updateInputDirection()).to.have.property('type', HOME_UPDATE_INPUT_DIRECTION);
  });

  it('handles action type HOME_UPDATE_INPUT_DIRECTION correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_UPDATE_INPUT_DIRECTION }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
