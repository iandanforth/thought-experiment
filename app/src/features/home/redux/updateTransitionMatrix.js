// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  HOME_UPDATE_TRANSITION_MATRIX,
} from './constants';

export function updateTransitionMatrix(newMatrix) {
  return {
    type: HOME_UPDATE_TRANSITION_MATRIX,
    newMatrix
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_UPDATE_TRANSITION_MATRIX:
      return {
        ...state,
        tm: action.newMatrix
      };

    default:
      return state;
  }
}
