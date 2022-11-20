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
  return (
    <div className="displayBox">
      <span>
        <h2 style={{'font-family': 'nunito', 'color': 'rgb(145, 143, 143)', }}>Restaurants</h2>
        <button onClick={props.syncUpdate} disabled={props.synced}>sync</button>
      </span>
      <div className='cards'>
        {cards} 
      </div>
    </div>
  )
};

export default RestaurantsDisplay;