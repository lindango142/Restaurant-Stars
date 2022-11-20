import { Map, Marker } from 'google-maps-react';
import React, { Component } from 'react';

const style = {
  width: '100%', 
  height: '100%', 
  position: 'relative', 
  'border-radius': "10px", 
  'margin-top': "10px", 
  border: '1px solid rgb(198, 224, 255)', 
  'box-shadow': '5px 5px 5px rgba(0,0,0,0.1)'
}
const containerStyle = {
  width: "400px", 
  height: '400px', 
  position: 'relative'
}
 
export class MapContainer extends Component { 
  render() {
    const marks = [];
    for (let i = 0; i < this.props.restaurantList.length; i++) {
      marks.push(<Marker position={this.props.restaurantList[i].marks}/>)
    }
    return (
        <Map 
          google={window.google} 
          zoom={8} 
          style={style} 
          containerStyle={containerStyle}
          initialCenter={{lat: 34.06207, lng:-118.03183}}>
          {marks}
        </Map>
    );
  }
}
 
export default MapContainer

