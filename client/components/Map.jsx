import React from 'react';

const style = {
  width: '100%', 
  height: '100%', 
  position: 'relative', 
  borderRadius: "10px", 
  marginTop: "10px", 
  border: '1px solid rgb(198, 224, 255)', 
  boxShadow: '5px 5px 5px rgba(0,0,0,0.1)'
}
const containerStyle = {
  width: "400px", 
  height: '400px', 
  position: 'relative'
}
 
const MapContainer = (props) => { 
  const ref = React.useRef(null);
  const [map, setMap] = React.useState();
  var latlng = new google.maps.LatLng(34.06207, -118.03183);

  React.useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {zoom: 8, center: latlng}));
    }
  }, [ref, map]);

  for (let i = 0; i < props.restaurantList.length; i++) {
    var marker = new google.maps.Marker({
      position: props.restaurantList[i].marks,
      title:"Hello World!"
    });
    marker.setMap(map);
  }

  return (
    <div style={containerStyle}>
      <div ref={ref} style={style}/>
    </div>
  )
}
 
export default MapContainer

