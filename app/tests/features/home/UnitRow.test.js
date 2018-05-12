import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { UnitRow } from 'src/features/home';

describe('home/UnitRow', () => {
  it('renders node with correct class name', () => {
    const renderedComponent = shallow(
      <UnitRow />
    );

    expect(
      renderedComponent.find('.home-unit-row').getElement()
    ).to.exist;
  });
});
