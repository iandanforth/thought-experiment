// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  HOME_START_INPUT_RUNNING,
} from './constants';

export function startInputRunning() {
  return {
    type: HOME_START_INPUT_RUNNING,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_START_INPUT_RUNNING:
      return {
        ...state,
        inputRunning: true
      };

    default:
      return state;
  }
}
