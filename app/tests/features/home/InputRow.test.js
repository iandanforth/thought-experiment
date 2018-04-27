import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { InputRow } from 'src/features/home/InputRow';

describe('home/InputRow', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <InputRow {...props} />
    );

    expect(
      renderedComponent.find('.home-input-row').getElement()
    ).to.exist;
  });
});
