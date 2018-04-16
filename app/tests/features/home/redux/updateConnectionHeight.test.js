import { expect } from 'chai';

import {
  HOME_UPDATE_CONNECTION_HEIGHT,
} from 'src/features/home/redux/constants';

import {
  updateConnectionHeight,
  reducer,
} from 'src/features/home/redux/updateConnectionHeight';

describe('home/redux/updateConnectionHeight', () => {
  it('returns correct action by updateConnectionHeight', () => {
    expect(updateConnectionHeight()).to.have.property('type', HOME_UPDATE_CONNECTION_HEIGHT);
  });

  it('handles action type HOME_UPDATE_CONNECTION_HEIGHT correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_UPDATE_CONNECTION_HEIGHT }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
