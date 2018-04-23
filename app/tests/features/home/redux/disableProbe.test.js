import { expect } from 'chai';

import {
  HOME_DISABLE_PROBE,
} from 'src/features/home/redux/constants';

import {
  disableProbe,
  reducer,
} from 'src/features/home/redux/disableProbe';

describe('home/redux/disableProbe', () => {
  it('returns correct action by disableProbe', () => {
    expect(disableProbe()).to.have.property('type', HOME_DISABLE_PROBE);
  });

  it('handles action type HOME_DISABLE_PROBE correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_DISABLE_PROBE }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
