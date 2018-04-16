import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { InputContainer } from 'src/features/home/InputContainer';

describe('home/InputContainer', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <InputContainer {...props} />
    );

    expect(
      renderedComponent.find('.home-input-container').getElement()
    ).to.exist;
  });
});
