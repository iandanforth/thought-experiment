import { expect } from 'chai';

import {
  HOME_UPDATE_NUM_NEURONS,
} from 'src/features/home/redux/constants';

import {
  updateNumNeurons,
  reducer,
} from 'src/features/home/redux/updateNumNeurons';

describe('home/redux/updateNumNeurons', () => {
  it('returns correct action by updateNumNeurons', () => {
    expect(updateNumNeurons()).to.have.property('type', HOME_UPDATE_NUM_NEURONS);
  });

  it('handles action type HOME_UPDATE_NUM_NEURONS correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_UPDATE_NUM_NEURONS }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
