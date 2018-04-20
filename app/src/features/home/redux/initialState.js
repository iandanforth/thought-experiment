// Initial state is the place you define all initial values for the Redux store of the feature.
// In the 'standard' way, initialState is defined in reducers: http://redux.js.org/docs/basics/Reducers.html
// But when application grows, there will be multiple reducers files, it's not intuitive what data is managed by the whole store.
// So Rekit extracts the initial state definition into a separate module so that you can have
// a quick view about what data is used for the feature, at any time.
import { initTransitionMatrix } from '../../../common/transitionMatrix';
import { initInputVector } from '../../../common/inputVector';

// NOTE: initialState constant is necessary so that Rekit could auto add initial state when creating async actions.
const initialNumNeurons = 8;
const initialState = {
  count: 0,
  redditReactjsList: [],
  fetchRedditReactjsListError: null,
  fetchRedditReactjsListPending: false,
  numNeurons: initialNumNeurons,
  neuronRadius: 15,
  neuronSpacing: 30,
  baseConnectionHeight: 5,
  numInputNeurons: initialNumNeurons,
  updateDelay: 1000,
  propagationDelay: 800,
  tm: initTransitionMatrix(initialNumNeurons),
  nv: initInputVector(initialNumNeurons),
  iv: initInputVector(initialNumNeurons),
  running: false
};

export default initialState;
