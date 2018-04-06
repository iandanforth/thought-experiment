import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Neuron } from 'src/features/home';

describe('home/Neuron', () => {
  it('renders node with correct class name', () => {
    const renderedComponent = shallow(
      <Neuron />
    );

    expect(
      renderedComponent.find('.home-neuron').getElement()
    ).to.exist;
  });
});
