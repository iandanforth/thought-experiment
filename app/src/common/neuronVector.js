import * as math from 'mathjs';

// Re-export this until we find a need for differentiation
export { initInputVector as initNeuronVector } from './inputVector';

export function getNextNeuronVector(prevNV, iv, TM, threshold = 0.7) {
  // iv is our input vector, we want to have our next neuron vector be a product of the previous neuron vector as well

  // Any neuron strongly connected to a neuron active in the last timestep should become active in the next
  /*
      A    B   C
  A 0.0  0.8 0.1
  B 0.1  0.0 0.8
  C 0.8  0.1 0.0

  1,3 * 3,3 = 1, 3

  If we multiply prevNV by our transition matrix we'll get a sum of the connection strengths between neurons
  active in the previous timestep and all the rest.

  sumOfConnectionStrengths = prevNV * TM

  We can then add our iv to get our total input from both prevNV and iv.

  inputTotals = sumOfConnectionStrengths + iv

  Finally we threshhold that to get which neurons should become active

  nextNV = number(inputTotals > threshold)
  */
  let nextNV;
  const scope = {
    TM,
    prevNV,
    iv,
    threshold,
    nextNV
  };
  math.eval(`
    sumOfConnectionStrengths = prevNV * TM;
    inputTotals = sumOfConnectionStrengths + iv;
    nextNV = number(inputTotals > threshold);
    `, scope
  );
  nextNV = scope.nextNV.toArray();
  console.log(scope.inputTotals.toArray());
  console.log(nextNV);
  return nextNV;
}
