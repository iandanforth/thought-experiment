// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da
import * as math from 'mathjs';
import { updateTransitionMatrix as uTM } from '../../../common/transitionMatrix';

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
  const TM = state.tm.clone();
  const { previous, active } = action;
  switch (action.type) {
    case HOME_UPDATE_TRANSITION_MATRIX:
      return {
        ...state,
        tm: uTM(TM, previous + 1, active + 1) // 1 index shift
      };

    default:
      return state;
  }
}
