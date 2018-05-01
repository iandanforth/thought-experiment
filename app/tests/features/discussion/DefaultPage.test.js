import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { DefaultPage } from 'src/features/discussion/DefaultPage';

describe('discussion/DefaultPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      discussion: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DefaultPage {...props} />
    );

    expect(
      renderedComponent.find('.discussion-default-page').getElement()
    ).to.exist;
  });
});
