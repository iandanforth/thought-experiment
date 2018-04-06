import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { NetworkContainer } from 'src/features/home';

describe('home/NetworkContainer', () => {
  it('renders node with correct class name', () => {
    const renderedComponent = shallow(
      <NetworkContainer />
    );

    expect(
      renderedComponent.find('.home-network-container').getElement()
    ).to.exist;
  });
});
