import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Connection } from 'src/features/home';

describe('home/Connection', () => {
  it('renders node with correct class name', () => {
    const renderedComponent = shallow(
      <Connection />
    );

    expect(
      renderedComponent.find('.home-connection').getElement()
    ).to.exist;
  });
});
