// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da
import { initInputVector } from '../../../common/inputVector';

import {
  HOME_RESET_INPUT_VECTOR,
} from './constants';

export function resetInputVector() {
  return {
    type: HOME_RESET_INPUT_VECTOR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_RESET_INPUT_VECTOR:
      return {
        ...state,
        iv: initInputVector(state.numNeurons)
      };

    default:
      return state;
  }
}
