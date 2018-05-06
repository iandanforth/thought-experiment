// Initial state is the place you define all initial values for the Redux store of the feature.
// In the 'standard' way, initialState is defined in reducers: http://redux.js.org/docs/basics/Reducers.html
// But when application grows, there will be multiple reducers files, it's not intuitive what data is managed by the whole store.
// So Rekit extracts the initial state definition into a separate module so that you can have
// a quick view about what data is used for the feature, at any time.
import { initTransitionMatrix } from '../../../common/transitionMatrix';
import { initInputVector, INPUT_DIRECTION } from '../../../common/inputVector';

// NOTE: initialState constant is necessary so that Rekit could auto add initial state when creating async actions.
const initialNumNeurons = 8;
const initialUpdateDelay = 500;
const propegationDelayRatio = 0.8;
const initialPropegationDelay = initialUpdateDelay * propegationDelayRatio;
const initialState = {
  count: 0,
  redditReactjsList: [],
  networkY: 200,
  stageWidth: 800,
  numNeurons: initialNumNeurons,
  neuronRadius: 18,
  neuronSpacing: 25,
  baseConnectionHeight: 10,
  baseConnectionWidth: 7,
  numInputNeurons: initialNumNeurons,
  inputDirection: INPUT_DIRECTION.RIGHT,
  updateDelay: initialUpdateDelay,
  propegationDelayRatio,
  propagationDelay: initialPropegationDelay,
  tm: initTransitionMatrix(initialNumNeurons),
  nv: initInputVector(initialNumNeurons),
  iv: initInputVector(initialNumNeurons),
  running: false,
  inputRunning: false,
  probeOnce: false
};

export default initialState;
