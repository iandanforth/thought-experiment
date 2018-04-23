// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da
import { initInputVector } from '../../../common/inputVector';

import {
  HOME_DISABLE_PROBE,
} from './constants';

export function disableProbe() {
  return {
    type: HOME_DISABLE_PROBE,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_DISABLE_PROBE:
      return {
        ...state,
        probeOnce: false,
        iv: initInputVector(state.numNeurons)
      };

    default:
      return state;
  }
}
