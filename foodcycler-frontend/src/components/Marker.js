import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaMapMarkerAlt } from 'react-icons/fa';

import './css/Marker.css';


const Marker = (props) => {
  const { lat, lng } = props;
  const [showPopup, setShowPopup] = useState(false);

  const handleMarkerClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div style={{ position: 'relative', transform: 'translate(-50%, -50%)' }}>
      <FaMapMarkerAlt color="red" size={30} onClick={handleMarkerClick}/>
      {showPopup && (
        <div className="seller">
          <p><b>Food for sale</b></p>
          <p>Seller information</p>
          <a href="#" style={{ display: 'block', paddingBottom: '10px' }}>
            Contact seller for purchase
          </a>
          <button onClick={handleClosePopup}>Close</button>
        </div>
      )}
    </div>
  );
};

Marker.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
};

export default Marker;
