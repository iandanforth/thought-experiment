import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Simulation } from 'src/features/home/Simulation';

describe('home/Simulation', () => {
  it('renders node with correct class name', () => {
    const pageProps = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Simulation {...pageProps} />
    );

    expect(
      renderedComponent.find('.home-simulation').getElement()
    ).to.exist;
  });
});
