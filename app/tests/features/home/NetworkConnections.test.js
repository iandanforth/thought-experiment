import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { NetworkConnections } from 'src/features/home';

describe('home/NetworkConnections', () => {
  it('renders node with correct class name', () => {
    const renderedComponent = shallow(
      <NetworkConnections />
    );

    expect(
      renderedComponent.find('.home-network-connections').getElement()
    ).to.exist;
  });
});
