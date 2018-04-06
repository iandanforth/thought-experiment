import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Arrowhead } from 'src/features/home';

describe('home/Arrowhead', () => {
  it('renders node with correct class name', () => {
    const renderedComponent = shallow(
      <Arrowhead />
    );

    expect(
      renderedComponent.find('.home-arrowhead').getElement()
    ).to.exist;
  });
});
