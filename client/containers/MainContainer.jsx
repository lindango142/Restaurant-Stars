import React, { Component } from 'react';
import { connect } from 'react-redux';
import RestaurantsContainer from './RestaurantsContainer.jsx';
import * as actions from '../actions/actions';

const mapStateToProps = state => ({
  // add pertinent state here

});

class MainContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div id="full">
        <nav>REVIEWS</nav>
        <div className="container">
          { /* Start adding components here... */ }
          <RestaurantsContainer />
        </div>
      </div>
    );
  }

}

export default connect(mapStateToProps, null)(MainContainer);