import React from 'react';
import RestaurantsContainer from './RestaurantsContainer.jsx';

const MainContainer = () => {
  return(
    <div id="full">
      <nav>REVIEWS</nav>
      <div className="container">
        <RestaurantsContainer />
      </div>
    </div>
  );

}

export default MainContainer;