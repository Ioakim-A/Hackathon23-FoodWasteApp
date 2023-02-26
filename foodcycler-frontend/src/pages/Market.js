import React, { useState, useEffect } from 'react';
import Map from '../components/Map';
import axios from 'axios';


async function getLanLng(postcodes) {
    const convertedPostcodes = await Promise.all(postcodes.map(
        async (postcode) => {
            const res = await axios.get(`https://api.postcodes.io/postcodes/${postcode}`)
            const lat = parseFloat(res.data.result.latitude);
            const lng = parseFloat(res.data.result.longitude);
            return [lat, lng];
        }
    ));
    return convertedPostcodes;
}


function Market() {
    // ideally would request this to the backend and get the postcodes as a response.
    const user = {
      'lat': 51.506684,
      'lng': -0.063787
    }
    const postcodes = [
      'E1W2JJ',
      'E114RJ',
      'WC1B3BA',
    ];
  
    const [markers, setMarkers] = useState([]);
  
    useEffect(() => {
      getLanLng(postcodes).then((data) => {
        setMarkers(data);
      });
    }, [postcodes]);

    return (
      <div>
        <h2>Food near you:</h2>
        <Map center={user} zoom={11} markers={markers}/>
      </div>
    )
  }
  
  export default Market;