import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Controls } from 'src/features/home/Controls';

describe('home/Controls', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Controls {...props} />
    );

    expect(
      renderedComponent.find('.home-controls').getElement()
    ).to.exist;
  });
});
