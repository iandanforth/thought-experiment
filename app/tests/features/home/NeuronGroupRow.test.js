import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { NeuronGroupRow } from 'src/features/home';

describe('home/NeuronGroupRow', () => {
  it('renders node with correct class name', () => {
    const renderedComponent = shallow(
      <NeuronGroupRow />
    );

    expect(
      renderedComponent.find('.home-neuron-group-row').getElement()
    ).to.exist;
  });
});
