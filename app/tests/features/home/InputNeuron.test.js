import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { InputNeuron } from 'src/features/home';

describe('home/InputNeuron', () => {
  it('renders node with correct class name', () => {
    const renderedComponent = shallow(
      <InputNeuron />
    );

    expect(
      renderedComponent.find('.home-input-neuron').getElement()
    ).to.exist;
  });
});
