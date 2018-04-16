// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  HOME_UPDATE_NEURON_RADIUS,
} from './constants';

export function updateNeuronRadius(newRadius) {
  return {
    type: HOME_UPDATE_NEURON_RADIUS,
    newRadius
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_UPDATE_NEURON_RADIUS:
      return {
        ...state,
        neuronRadius: action.newRadius
      };

    default:
      return state;
  }
}
