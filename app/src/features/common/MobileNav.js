import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class MobileNav extends Component {
  static propTypes = {

  };

  render() {
    return (
      <div className="common-mobile-nav">
        <div className="link-container">
          <Link to="" href="">Intro</Link>
          <Link to="simulation" href="simulation">Simulation</Link>
          <Link to="discussion" href="discussion">Discussion</Link>
        </div>
      </div>
    );
  }
}
