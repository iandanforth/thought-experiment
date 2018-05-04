import * as math from 'mathjs';

const DEBUG = false;
/**
 * Create an n by n matrix where transition probabilities are evenly distributed across
 * non-diagnonal values.
 */
export function initTransitionMatrix(n) {
  let TM = math.ones(n, n);
  TM = math.multiply(TM, 0.25);
  return TM;
}

/**
 * Increment or Decrement, heh :)
 * delta should either be -1 or 1
 *
 * See https://www.desmos.com/calculator/eatrqep72z
 * for an explanation of equations and magic numbers slope/expansion
 */
function xcrement(delta, matrix, slope, expansion, mask) {
  const scope = {
    delta,
    matrix,
    slope,
    expansion,
    mask
  };

  // This is much more complicated than it needs to be, I just wanted to play with smooth functions.
  // an alternate implementation would store integer values 0 - 12 since that's the effective operative range
  const resultSet = math.eval(`
    masked = matrix .* (mask == 0)
    unmasked = matrix .* (mask == 1)
    linear = atanh(unmasked / expansion) / slope
    linear = linear + (delta .* (mask == 1))
    matrix = tanh(linear * slope) * expansion
    matrix = matrix + masked
  `, scope);
  if (DEBUG) {
    console.log(resultSet);
  }

  return scope.matrix;
}

function max(matrix, value) {
  const scope = { matrix, value };
  math.eval(`
    matrix = ((matrix > value) .* matrix) + (((matrix > value) == false) .* value);
  `, scope);
  return scope.matrix;
}

function min(matrix, value) {
  const scope = { matrix, value };
  math.eval(`
    matrix = ((matrix < value) .* matrix) + (((matrix < value) == false) .* value);
  `, scope);
  return scope.matrix;
}

/**
 * Hebbian Learning
 * 
 * TODO: Consider some much simpler model.
 *
 * Which transitions should we be incrementing? Transitions between neurons that were active
 * in the last timestep and any connected neuron active now.
 * predictiveTransitions = prevNeuronVector' * neuronVector
 *
 * Which transitions should we be decrementing? Transitions between neurons that are active now and
 * were active in the last timestep. (A predicts B implies B does not predict A)
 * nonpredictiveTransition = predictiveTransitions';
 *
 * How *much* should we reduce our connection strength? Unknown. Let's use tanh as a model.
 *
 * The rest of the transitions should be left alone.
 */
export function getNextTransitionMatrix(TM, previousNeuronVector, neuronVector) {
  if (DEBUG) {
    console.log('PrevNV', previousNeuronVector);
    console.log('NextNV', neuronVector);
  }
  let predictiveTransitions;
  let nonpredictiveTransitions;
  const scope = {
    previousNeuronVector,
    neuronVector,
    predictiveTransitions,
    nonpredictiveTransitions
  };

  const resultSet = math.eval(`
    predictiveTransitions = [previousNeuronVector]' * [neuronVector]
    nonpredictiveTransitions = predictiveTransitions'
  `, scope);

  if (DEBUG) console.log(resultSet);
  const slope = 0.15;
  const expansion = 1.01;
  if (DEBUG) console.log('Incrementing');
  let newTM = xcrement(1, TM, slope, expansion, scope.predictiveTransitions);
  if (DEBUG) console.log('Decrementing');
  newTM = xcrement(-1, newTM, slope, expansion, scope.nonpredictiveTransitions);
  newTM = max(newTM, 0);
  newTM = min(newTM, 1);
  return newTM;
}
