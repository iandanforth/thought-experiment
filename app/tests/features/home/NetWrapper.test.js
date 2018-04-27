import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { NetWrapper } from 'src/features/home';

describe('home/NetWrapper', () => {
  it('renders node with correct class name', () => {
    const renderedComponent = shallow(
      <NetWrapper />
    );

    expect(
      renderedComponent.find('.home-net-wrapper').getElement()
    ).to.exist;
  });
});
