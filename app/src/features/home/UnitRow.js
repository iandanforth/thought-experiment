import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { calcUnitX } from '../../common/displayHelpers';

export default class UnitRow extends Component {
  static propTypes = {
    unitActivations: PropTypes.array.isRequired,
    neuronSpacing: PropTypes.number.isRequired,
    neuronRadius: PropTypes.number.isRequired,
    numNeurons: PropTypes.number.isRequired,
    stageWidth: PropTypes.number.isRequired,
    startY: PropTypes.number.isRequired,
    UnitClass: PropTypes.func.isRequired,
    updateDelay: PropTypes.number.isRequired
  };

  get units() {
    const {
      stageWidth,
      startY,
      neuronSpacing,
      neuronRadius,
      numNeurons,
      unitActivations,
      UnitClass,
      updateDelay
    } = this.props;

    const units = [];
    const fadeDuration = updateDelay / 3;

    for (let i = 0; i < unitActivations.length; i++) {
      let active = false;
      if (unitActivations[i] === 1) {
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
