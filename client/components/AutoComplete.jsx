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
  fields: ["name", "address_components"],
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
    props.addRestaurant(input.place.name, city);
    // console.log(input, 2)
    event.target[0].value = ''
    // props.syncCards(props);
  };
  const sync = (event) => {
    event.preventDefault();
    props.syncCards();
  }

  props.syncCards();

 return (
   <div>
    <form onSubmit={submit}>
     <label>enter place: </label>
     <input ref={inputRef}/>
     <button> Add </button>
    </form>
    {/* <button onClick={sync}> Sync </button> */}
   </div>
 );
};
export default AutoComplete;