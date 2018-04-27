import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Discussion } from 'src/features/home';

describe('home/Discussion', () => {
  it('renders node with correct class name', () => {
    const renderedComponent = shallow(
      <Discussion />
    );

    expect(
      renderedComponent.find('.home-discussion').getElement()
    ).to.exist;
  });
});
