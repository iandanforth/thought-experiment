import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import SimpleNav from '../common/SimpleNav';
import MobileNav from '../common/MobileNav';
import ConnectedControls from './Controls';
import routeConfig from '../../common/routeConfig';

/*
  This is the root component of your app. Here you define the overall layout
  and the container of the react router. The default one is a two columns layout.
  You should adjust it according to the requirement of your app.
*/
export default class App extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  static defaultProps = {
    children: 'No content.',
  };

  render() {
    return (
      <div className="home-app">
        <MobileNav />
        <div className="sidebar">
          <SimpleNav routes={routeConfig} />
          <Route path="/simulation" component={ConnectedControls} />
        </div>
        <div className="page-container">
          {this.props.children}
        </div>
      </div>
    );
  }
}
