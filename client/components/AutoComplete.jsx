import React, { useRef, useEffect, Component } from "react";
import { connect } from 'react-redux';
// import actions from action creators file
import * as actions from '../actions/actions';
import { MapContainer } from "./Map.jsx";
// import child components...

let input;
let city; 

const AutoComplete = (props) => {
  const autoCompleteRef = useRef();
  const inputRef = useRef();
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
  const submit = (event) => {
    event.preventDefault();
    props.addRestaurant(input.place.name, city, { lat: input.place.geometry.location.lat(), lng: input.place.geometry.location.lng()});
    event.target[0].value = ''
  };
  
  if (Object.keys(props.sync).length) {
    props.syncCards();
  }

 return (
   <div className="mapContainer">
    <form onSubmit={submit}>
     <label style={{'font-family': 'nunito'}}>Store: </label>
     <input id="placeInput" ref={inputRef}/>
     <button id="addPlace"> Add </button>
    </form>
    <MapContainer restaurantList={props.restaurantList}/>
   </div>
 );
};
export default AutoComplete;