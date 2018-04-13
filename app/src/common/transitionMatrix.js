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

export function updateTransitionMatrix(TM, previous, active) {
  const scope = {
    TM,
    previous,
    active
  };
  math.eval('TM[previous,active] = TM[previous,active] + 1', scope);
  math.eval('TM[previous,:] = TM[previous,:] / sum(TM[previous,:])', scope);
  return TM;
}
