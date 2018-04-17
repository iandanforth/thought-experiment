// This is the root reducer of the feature. It is used for:
//   1. Load reducers from each action in the feature and process them one by one.
//      Note that this part of code is mainly maintained by Rekit, you usually don't need to edit them.
//   2. Write cross-topic reducers. If a reducer is not bound to some specific action.
//      Then it could be written here.
// Learn more from the introduction of this approach:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da.


import initialState from './initialState';
import { reducer as counterPlusOneReducer } from './counterPlusOne';
import { reducer as counterMinusOneReducer } from './counterMinusOne';
import { reducer as resetCounterReducer } from './resetCounter';
import { reducer as fetchRedditReactjsListReducer } from './fetchRedditReactjsList';
import { reducer as updateTransitionMatrixReducer } from './updateTransitionMatrix';
import { reducer as updateNeuronSpacingReducer } from './updateNeuronSpacing';
import { reducer as updateConnectionHeightReducer } from './updateConnectionHeight';
import { reducer as updateNeuronRadiusReducer } from './updateNeuronRadius';
import { reducer as updateInputVectorReducer } from './updateInputVector';
import { reducer as updateUpdateDelayReducer } from './updateUpdateDelay';
import { reducer as startRunningReducer } from './startRunning';
import { reducer as stopRunningReducer } from './stopRunning';
import { reducer as resetTransitionMatrixReducer } from './resetTransitionMatrix';

const reducers = [
  counterPlusOneReducer,
  counterMinusOneReducer,
  resetCounterReducer,
  fetchRedditReactjsListReducer,
  updateTransitionMatrixReducer,
  updateNeuronSpacingReducer,
  updateConnectionHeightReducer,
  updateNeuronRadiusReducer,
  updateInputVectorReducer,
  updateUpdateDelayReducer,
  startRunningReducer,
  stopRunningReducer,
  resetTransitionMatrixReducer,
];

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    // Put global reducers here
    default:
      newState = state;
      break;
  }
  /* istanbul ignore next */
  return reducers.reduce((s, r) => r(s, action), newState);
}
