import * as math from 'mathjs';

export function initTransitionMatrix(n) {
  // TM = ones(n, n);
  // TM -= eye(n);
  // TM /= n - 1;
  let TM = math.ones([n, n]);
  TM = math.subtract(TM, math.eye(n, n));
  TM = math.divide(TM, (n - 1));
  return TM;
}
