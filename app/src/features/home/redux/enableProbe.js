// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da
import { initInputVector } from '../../../common/inputVector';


import {
  HOME_ENABLE_PROBE,
} from './constants';

export function enableProbe() {
  return {
    type: HOME_ENABLE_PROBE,
  };
}

export function reducer(state, action) {
  const iv = initInputVector(state.numNeurons);
  iv[0] = 1;
  switch (action.type) {
    case HOME_ENABLE_PROBE:
      return {
        ...state,
        probeOnce: true,
        iv
      };

    default:
      return state;
  }
}
