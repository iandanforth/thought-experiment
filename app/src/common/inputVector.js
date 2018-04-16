import * as math from 'mathjs';

export function initInputVector(n) {
  // Note that passing an array to zeros() causes it to return an array rather than a matrix
  return math.zeros([n]);
}
