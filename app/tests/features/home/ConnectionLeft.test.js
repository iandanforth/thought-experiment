import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { ConnectionLeft } from 'src/features/home';

describe('home/ConnectionLeft', () => {
  it('renders node with correct class name', () => {
    const renderedComponent = shallow(
      <ConnectionLeft />
    );

    expect(
      renderedComponent.find('.home-connection-left').getElement()
    ).to.exist;
  });
});
