import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { InputContainer } from 'src/features/home';

describe('home/InputContainer', () => {
  it('renders node with correct class name', () => {
    const renderedComponent = shallow(
      <InputContainer />
    );

    expect(
      renderedComponent.find('.home-input-container').getElement()
    ).to.exist;
  });
});
