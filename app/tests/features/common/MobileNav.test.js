import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { MobileNav } from 'src/features/common';

describe('common/MobileNav', () => {
  it('renders node with correct class name', () => {
    const renderedComponent = shallow(
      <MobileNav />
    );

    expect(
      renderedComponent.find('.common-mobile-nav').getElement()
    ).to.exist;
  });
});
