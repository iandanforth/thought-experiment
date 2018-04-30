// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

// Combines updating the neuronVector and the transitionMatrix
import {
  HOME_UPDATE_FULL_NETWORK,
} from './constants';

export function updateFullNetwork(newNeuronVector, newTransitionMatrix) {
  return {
    type: HOME_UPDATE_FULL_NETWORK,
    newNeuronVector,
    newTransitionMatrix
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_UPDATE_FULL_NETWORK:
      return {
        ...state,
        nv: action.newNeuronVector,
        tm: action.newTransitionMatrix
      };

    default:
      return state;
  }
}
