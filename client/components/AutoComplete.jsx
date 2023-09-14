import React, { useRef, useEffect, useState } from "react";
import MapContainer from "./Map.jsx";

const AutoComplete = ({addRestaurant, syncCards, sync, restaurantList}) => {
  const autoCompleteRef = useRef();
  const inputRef = useRef();
  const [place, setPlace] = useState();

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
      await setPlace(autoCompleteRef.current.getPlace());
    });
  }, []);

  // function for adding a restaurant to the restaurant list
  const submit = (event) => {
    event.preventDefault();
    let city
    for (let i = 0; i < place.address_components.length; i++) {
      if (place.address_components[i].types[0] === 'locality') city = place.address_components[i].long_name
    }
    addRestaurant(place.name, city, { lat: place.geometry.location.lat(), lng: place.geometry.location.lng()});
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