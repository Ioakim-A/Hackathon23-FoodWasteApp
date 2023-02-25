import React, { Component } from 'react';
import Map from '../components/Map'

function Market() {
    const center = { lat: 37.7749, lng: -122.4194 };
    const zoom = 8;

    return (
        <div>
            <h1>My Google Maps App</h1>
            <Map center={center} zoom={zoom} />
        </div>
    )
}

export default Market;