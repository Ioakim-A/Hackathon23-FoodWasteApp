// import React, { Component } from 'react';
// import GoogleMapReact from 'google-map-react'
// import Location from './Location.js'

// import './map.css';

// function Map({ you, zoomLevel }) {
//   function getLocation() {
//     const location = {
//       address: "",
//       lat: you.latitude,
//       lng: you.longitude 
//     };
//     return location;
//   }

//   const location = getLocation();
//   return (
//     <div className="map">
//       <h2 className="map-h2">Come Visit Us At Our Campus</h2>

//       <div className="google-map">
//         <GoogleMapReact
//           bootstrapURLKeys={{ key: 'AIzaSyAUwxAYYfHdRhYozSyyppRioupLvPIiA7g' }}
//           defaultCenter={location}
//           defaultZoom={zoomLevel}
//         >
//           <Location
//             lat={location.lat}
//             lng={location.lng}
//             text={location.address}
//           >
//           </Location>
//         </GoogleMapReact>
//       </div>
//     </div>
//   )
// }

// export default Map;

import React from 'react';
import GoogleMapReact from 'google-map-react';

const Map = (props) => {
  const { center, zoom } = props;

  return (
    <div style={{ height: '500px', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyAUwxAYYfHdRhYozSyyppRioupLvPIiA7g' }}
        defaultCenter={center}
        defaultZoom={zoom}
      />
    </div>
  );
}

export default Map;
