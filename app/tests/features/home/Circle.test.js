import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Circle } from 'src/features/home';

describe('home/Circle', () => {
  it('renders node with correct class name', () => {
    const renderedComponent = shallow(
      <Circle />
    );

    expect(
      renderedComponent.find('.home-circle').getElement()
    ).to.exist;
  });
});
