// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  HOME_UPDATE_INPUT_DIRECTION,
} from './constants';

export function updateInputDirection(newDir) {
  return {
    type: HOME_UPDATE_INPUT_DIRECTION,
    newDir
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_UPDATE_INPUT_DIRECTION:
      return {
        ...state,
        inputDirection: action.newDir
      };

    default:
      return state;
  }
}
