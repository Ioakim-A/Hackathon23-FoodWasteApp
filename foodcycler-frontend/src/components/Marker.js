import React from 'react';
import PropTypes from 'prop-types';
import { FaMapMarkerAlt } from 'react-icons/fa';

const Marker = (props) => {
  const { lat, lng } = props;
  console.log(lat, lng)
  return (
    <div style={{ position: 'absolute', transform: 'translate(-50%, -50%)' }}>
      <FaMapMarkerAlt color="red" size={30} />
    </div>
  );
};

Marker.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
};

export default Marker;
