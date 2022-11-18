import React, {useEffect} from 'react';
import Restaurants from './Restaurants.jsx';

const RestaurantsDisplay = props => {
  const cards = [];
  // console.log(props)
  for (let i = 0; i < props.restaurantList.length; i++) {
    cards.push(<Restaurants restaurantList={props.restaurantList[i]}/>);
  }
  // console.log(Array.isArray(props.restaurantList))
  return (
    <div className="displayBox">
      <h4>Restaurants</h4>
      {cards}
      {/* <Restaurants restaurantList={props.restaurantList}/> */}
    </div>
  )
};

export default RestaurantsDisplay;