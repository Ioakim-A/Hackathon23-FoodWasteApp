import React, { Component } from 'react';
import { Icon } from '@iconify/react'
import locationIcon from '@iconify/icons-mdi/map-marker'


function Location({ text }) {
  <div className="location">
    <Icon icon={locationIcon} className="location-icon" />
    <p className="location-text">{text}</p>
  </div>
}

export default Location;