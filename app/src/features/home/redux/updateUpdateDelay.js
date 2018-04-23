// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  HOME_UPDATE_UPDATE_DELAY,
} from './constants';

export function updateUpdateDelay(newDelay) {
  return {
    type: HOME_UPDATE_UPDATE_DELAY,
    newDelay
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_UPDATE_UPDATE_DELAY:
      return {
        ...state,
        updateDelay: action.newDelay,
        propagationDelay: action.newDelay * state.propagationDelayRatio
      };

    default:
      return state;
  }
}
