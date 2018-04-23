import { expect } from 'chai';

import {
  HOME_ENABLE_PROBE,
} from 'src/features/home/redux/constants';

import {
  enableProbe,
  reducer,
} from 'src/features/home/redux/enableProbe';

describe('home/redux/enableProbe', () => {
  it('returns correct action by enableProbe', () => {
    expect(enableProbe()).to.have.property('type', HOME_ENABLE_PROBE);
  });

  it('handles action type HOME_ENABLE_PROBE correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_ENABLE_PROBE }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
