// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  HOME_STOP_RUNNING,
} from './constants';

export function stopRunning() {
  return {
    type: HOME_STOP_RUNNING,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_STOP_RUNNING:
      return {
        ...state,
        running: false
      };

    default:
      return state;
  }
}
