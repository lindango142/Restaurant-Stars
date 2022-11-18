import React, { useRef, useEffect, Component } from "react";
import { connect } from 'react-redux';
// import actions from action creators file
import * as actions from '../actions/actions';
// import child components...

let input;
let city; 

const AutoComplete = (props) => {
  const autoCompleteRef = useRef();
  const inputRef = useRef();
  const options = {
  componentRestrictions: { country: "us" },
  fields: ["name", "address_components", "type"],
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
    props.addRestaurant(input.place.name, city, input.place.types[0]);
    event.target[0].value = ''
  };
  
  props.syncCards();

 return (
   <div>
    <form onSubmit={submit}>
     <label>enter place: </label>
     <input id="place"ref={inputRef}/>
     <button> Add </button>
    </form>
   </div>
 );
};
export default AutoComplete;