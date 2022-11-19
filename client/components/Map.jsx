import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import React, {Component} from 'react';

const style = {
  width: '95%',
  height: '50%',
  'border-radius': '10px'
}
const containerStyle = {
  width: '100%',
  height: '100%'
}
 
export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    };
  }
  
  render() {
    const marks = [];
    for (let i = 0; i < this.props.markers.length; i++) {
      marks.push(<Marker position={this.props.markers[i]}/>)
    }
    return (
        <Map 
          google={window.google} 
          zoom={8} 
          style={{width: '100%', height: '100%', position: 'relative', 'border-radius': "10px", margin: "10px"}} 
          containerStyle={{width: "400px", height: '400px', position: 'relative'}}
          initialCenter={{lat: 34.06207, lng:-118.03183}}
        >
          {marks}
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}>
              <div>
                <h1>{this.state.selectedPlace.name}</h1>
              </div>
          </InfoWindow>
        </Map>

    );
  }
}
 
export default MapContainer

