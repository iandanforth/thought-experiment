import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { ConnectionRight } from 'src/features/home';

describe('home/ConnectionRight', () => {
  it('renders node with correct class name', () => {
    const renderedComponent = shallow(
      <ConnectionRight />
    );

    expect(
      renderedComponent.find('.home-connection-right').getElement()
    ).to.exist;
  });
});
