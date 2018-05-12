import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { calcUnitX } from '../../common/displayHelpers';

export default class UnitRow extends Component {
  static propTypes = {
    iv: Proptypes.array.isRequired,
    neuronSpacing: Proptypes.number.isRequired,
    neuronRadius: Proptypes.number.isRequired,
    numNeurons: Proptypes.number.isRequired,
    stageWidth: Proptypes.number.isRequired,
    startY: Proptypes.number.isRequired,
    UnitClass: Proptypes.func.isRequired,
    updateDelay: Proptypes.number.isRequired
  };

  get units() {
    const {
      stageWidth,
      startY,
      neuronSpacing,
      neuronRadius,
      numNeurons,
      iv,
      UnitClass,
      updateDelay
    } = this.props;

    const units = [];
    const fadeDuration = updateDelay / 3;

    for (let i = 0; i < iv.length; i++) {
      let active = false;
      if (iv[i] === 1) {
        active = true;
      }
      const key = `unit-${i}`;
      const x = calcUnitX(i, stageWidth, neuronSpacing, neuronRadius, numNeurons);
      const y = startY;
      const unit = (
        <UnitClass
          x={x}
          y={y}
          radius={neuronRadius}
          key={key}
          active={active}
          fadeDuration={fadeDuration}
        />
      );
      units.push(unit);
    }
    return units;
  }

  render() {
    return this.units;
  }
}
