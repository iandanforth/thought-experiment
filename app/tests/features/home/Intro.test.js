import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Intro } from 'src/features/home';

describe('home/Intro', () => {
  it('renders node with correct class name', () => {
    const renderedComponent = shallow(
      <Intro />
    );

    expect(
      renderedComponent.find('.home-intro').getElement()
    ).to.exist;
  });
});
