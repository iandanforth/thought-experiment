import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { DefaultPage } from 'src/features/introduction/DefaultPage';

describe('introduction/DefaultPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      introduction: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DefaultPage {...props} />
    );

    expect(
      renderedComponent.find('.introduction-default-page').getElement()
    ).to.exist;
  });
});
