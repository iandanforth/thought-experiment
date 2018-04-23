import * as math from 'mathjs';

export function initInputVector(n) {
  // Note that passing an array to zeros() causes it to return an array rather than a matrix
  const iv = math.zeros([n]);
  return iv;
}

export function getNextInputVector(prevIV) {
  // If there are no elements that === 1, we get -1 back
  const numNeurons = prevIV.length;
  const prevIndex = prevIV.findIndex(el => el === 1);
  const nextIndex = (prevIndex + 1) % numNeurons;
  const nextIV = initInputVector(numNeurons);
  nextIV[nextIndex] = 1;
  return nextIV;
}
