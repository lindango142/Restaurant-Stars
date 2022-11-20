import React, {useEffect} from 'react';
import Restaurants from './Restaurants.jsx';

const RestaurantsDisplay = ({restaurantList, updateRev, changeStatus, deleteCard, edit, editActionCreator}) => {
  // add all the cards in restaurant list array
  const cards = [];
  for (let i = 0; i < restaurantList.length; i++) {
    cards.push(
      <Restaurants 
        restaurantList={restaurantList[i]} 
        updateRev={updateRev} 
        changeStatus={changeStatus} 
        deleteCard={deleteCard} 
        edit={edit}
        editActionCreator={editActionCreator}
      />
    );
  }
  return (
    <div className="displayBox">
      <h2 style={{fontFamily: 'nunito', color: 'rgb(145, 143, 143)'}}>Restaurants</h2>
      <div className='cards'>
        {cards} 
      </div>
    </div>
  )
};

export default RestaurantsDisplay;