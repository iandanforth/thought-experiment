import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Controls } from 'src/features/home';

describe('home/Controls', () => {
  it('renders node with correct class name', () => {
    const renderedComponent = shallow(
      <Controls />
    );

    expect(
      renderedComponent.find('.home-controls').getElement()
    ).to.exist;
  });
});
