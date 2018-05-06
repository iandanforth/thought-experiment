import * as math from 'mathjs';
import assert from 'assert';

export const INPUT_DIRECTION = {
  RIGHT: 1,
  LEFT: -1
};

export function initInputVector(n) {
  // Note that passing an array to zeros() causes it to return an array rather than a matrix
  const iv = math.zeros([n]);
  return iv;
}

export function getNextInputVector(prevIV, dirIncrement) {
  assert.ok(
    Object.values(INPUT_DIRECTION).indexOf(dirIncrement) !== -1,
    'Invalid direction. Must be a value from inputVector/INPUT_DIRECTION'
  );
  // If there are no elements that === 1, we get -1 back
  const numNeurons = prevIV.length;
  const prevIndex = prevIV.findIndex(el => el === 1);
  let nextIndex = prevIndex + dirIncrement;
  nextIndex = nextIndex >= 0 ? nextIndex : numNeurons - 1; // Wrap RTL
  nextIndex %= numNeurons; // Wrap LTR
  const nextIV = initInputVector(numNeurons);
  nextIV[nextIndex] = 1;
  return nextIV;
}
