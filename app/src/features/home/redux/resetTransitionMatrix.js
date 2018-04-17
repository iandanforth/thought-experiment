// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da
import { initTransitionMatrix } from '../../../common/transitionMatrix';

import {
  HOME_RESET_TRANSITION_MATRIX,
} from './constants';

export function resetTransitionMatrix() {
  return {
    type: HOME_RESET_TRANSITION_MATRIX,
  };
}

export function reducer(state, action) {
  const { numNeurons } = state;
  switch (action.type) {
    case HOME_RESET_TRANSITION_MATRIX:
      return {
        ...state,
        tm: initTransitionMatrix(numNeurons)
      };

    default:
      return state;
  }
}
