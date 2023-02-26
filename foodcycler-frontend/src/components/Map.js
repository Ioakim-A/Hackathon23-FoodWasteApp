import React from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';


const Map = (props) => {
  const { center, zoom, markers } = props;
  return (
    <div style={{ height: '500px', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ 'key': process.env.REACT_APP_GOOGLEKEY }}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        {markers.map(
          (marker) => {
            return <Marker
            lat={marker[0]}
            lng={marker[1]}
            />
          }
          )
        }
      </GoogleMapReact>
    </div>
  );
}

export default Map;
