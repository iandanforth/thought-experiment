// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da
import * as math from 'mathjs';

import {
  HOME_UPDATE_TRANSITION_MATRIX,
} from './constants';

export function updateTransitionMatrix(previous, active) {
  return {
    type: HOME_UPDATE_TRANSITION_MATRIX,
    previous,
    active
  };
}

export function reducer(state, action) {
  let TM = state.tm.clone();
  let prev;
  switch (action.type) {
    case HOME_UPDATE_TRANSITION_MATRIX:
      // TM(p, a) += 1;
      // TM(p,:) /= sum(TM(p, :));
      // UTM = TM;
      console.log(state);
      // TODO: Figure out how to do god damned assignment with this lib
      prev = TM.subset(math.index(action.previous, action.active));
      TM.subset(math.index(action.previous, action.active), prev + 1);
      return {
        ...state,
        tm: TM
      };

    default:
      return state;
  }
}
