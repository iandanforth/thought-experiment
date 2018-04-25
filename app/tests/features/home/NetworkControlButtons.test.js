import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { NetworkControlButtons } from 'src/features/home/NetworkControlButtons';

describe('home/NetworkControlButtons', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <NetworkControlButtons {...props} />
    );

    expect(
      renderedComponent.find('.home-network-control-buttons').getElement()
    ).to.exist;
  });
});
