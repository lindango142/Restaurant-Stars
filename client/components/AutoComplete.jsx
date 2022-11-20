import React, { useRef, useEffect, Component } from "react";
import { connect } from 'react-redux';
// import actions from action creators file
import * as actions from '../actions/actions';
import { MapContainer } from "./Map.jsx";
// import child components...

let input;
let city; 

const AutoComplete = ({addRestaurant, syncCards, sync, restaurantList}) => {
  const autoCompleteRef = useRef();
  const inputRef = useRef();

  // what you want from the google map api
  const options = {
    componentRestrictions: { country: "us" },
    fields: ["name", "address_components", "geometry/location"],
    types: ["restaurant", "cafe"]
  };

  useEffect(() => {
    autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      options
    );
    autoCompleteRef.current.addListener("place_changed", async function () {
      const place = await autoCompleteRef.current.getPlace();
      input = { place };
        for (let i = 0; i < input.place.address_components.length; i++) {
          if (input.place.address_components[i].types[0] === 'locality') city = input.place.address_components[i].long_name
        }
    });
  }, []);

  // function for adding a restaurant to the restaurant list
  const submit = (event) => {
    event.preventDefault();
    addRestaurant(input.place.name, city, { lat: input.place.geometry.location.lat(), lng: input.place.geometry.location.lng()});
    event.target[0].value = ''
  };
  
  // if the sync object in state isn't an empty object, sync the cards to db
  if (Object.keys(sync).length) syncCards();
  
  return (
    <div className="mapContainer">
    <form onSubmit={submit}>
      <label style={{fontFamily: 'nunito'}}>Store: </label>
      <input id="placeInput" ref={inputRef}/>
      <button id="addPlace"> Add </button>
    </form>
    <MapContainer restaurantList={restaurantList}/>
    </div>
  );
};
export default AutoComplete;