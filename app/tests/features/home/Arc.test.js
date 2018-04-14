import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Arc } from 'src/features/home';

describe('home/Arc', () => {
  it('renders node with correct class name', () => {
    const renderedComponent = shallow(
      <Arc />
    );

    expect(
      renderedComponent.find('.home-arc').getElement()
    ).to.exist;
  });
});
