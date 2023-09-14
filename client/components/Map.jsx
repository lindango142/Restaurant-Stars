import React, { useEffect, useState, useRef } from 'react';
 
const MapContainer = (props) => { 
  const ref = useRef(null);
  const [map, setMap] = useState();
  var latlng = new google.maps.LatLng(34.06207, -118.03183);

  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {zoom: 8, center: latlng}));
    }
  }, [ref, map]);

  for (let i = 0; i < props.restaurantList.length; i++) {
    var marker = new google.maps.Marker({
      position: props.restaurantList[i].marks,
    });
    marker.setMap(map);
  }

  return (
    <div style={{
      width: "400px", 
      height: '400px', 
      position: 'relative'
    }}>
      <div ref={ref} style={{
        width: '100%', 
        height: '100%', 
        position: 'relative', 
        borderRadius: "10px", 
        marginTop: "10px", 
        border: '1px solid rgb(198, 224, 255)', 
        boxShadow: '5px 5px 5px rgba(0,0,0,0.1)'
      }}/>
    </div>
  )
}
 
export default MapContainer

