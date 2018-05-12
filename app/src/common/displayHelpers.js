
export const calcUnitX = (index, stageWidth, unitSpacing, unitRadius, totalNumUnits) => {
  /*
  * Calculate the x position for {index} unit on a stage of {stageWidth}
  */
  const stageCenter = stageWidth / 2;
  const middleNeuron = (totalNumUnits / 2) - 0.5; // 0 based
  const neuronOffest = index - middleNeuron;
  const spacing = unitSpacing + (2 * unitRadius);
  const offset = spacing * neuronOffest;
  const unitX = stageCenter + offset;
  return unitX;
};
