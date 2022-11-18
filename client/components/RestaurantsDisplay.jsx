import React, {useEffect} from 'react';
import Restaurants from './Restaurants.jsx';

const RestaurantsDisplay = props => {
  const cards = [];
  for (let i = 0; i < props.restaurantList.length; i++) {
    cards.push(
    <Restaurants 
      restaurantList={props.restaurantList[i]} 
      updateRev={props.updateRev} 
      syncCards={props.syncCards} 
      sync={props.sync} 
      syncUpdate={props.syncUpdate} 
      changeStatus={props.changeStatus} 
      deleteCard={props.deleteCard} 
      syncDelete={props.syncDelete} 
      update={props.update}
      remove={props.remove}
    />
    );
      
  }
  // console.log(props.syncDelete)
  return (
    <div className="displayBox">
      <h4>Restaurants</h4>
      {cards}
      {/* <Restaurants restaurantList={props.restaurantList}/> */}
      {/* <div className="allMarkets">
        {props.marketList.map((market, idx) => marketMaker(market, idx, props))}
      </div> */}
    </div>
  )
};

export default RestaurantsDisplay;