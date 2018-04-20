import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { NetworkContainer } from 'src/features/home/NetworkContainer';

describe('home/NetworkContainer', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <NetworkContainer {...props} />
    );

    expect(
      renderedComponent.find('.home-network-container').getElement()
    ).to.exist;
  });
});
