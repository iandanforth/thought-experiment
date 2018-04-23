import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Training } from 'src/features/home/Training';

describe('home/Training', () => {
  it('renders node with correct class name', () => {
    const pageProps = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Training {...pageProps} />
    );

    expect(
      renderedComponent.find('.home-training').getElement()
    ).to.exist;
  });
});
