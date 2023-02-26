import React, { useState } from 'react';
import Fridge from '../components/Fridge';
import capitalizeFirstLetter from '../utils/capitalizeFirstLetter';
import getUserNameFromSessionID from '../utils/getUserNameFromSessionID'

import './css/Home.css';

function Home() {
  const [username, setUsername] = useState(null);

  const sessionID = localStorage.getItem('sessionID');
  if (sessionID && !username) {
    setUsername(capitalizeFirstLetter(getUserNameFromSessionID(sessionID)));
  }

  return (
    <div className="home-container">
      <div className="fridge-container">
        <h1 className='fridgeText'>Check & Update your <b>Fridge</b>!</h1>
        <Fridge />
      </div>
      <div className="welcome-container">
        <h1 style={{ fontSize: '100px' }}>
          {username ? (
            <>
              <span>Welcome back,</span>
              <br />
              <span style={{ fontWeight: 'bold' }}>{username}</span>
            </>
          ) : (
            <>
              <span style={{ fontWeight: 'bold' }}>Welcome to</span>
              <br />
              <span style={{ fontWeight: 'bold' }}>FoodCycler!</span>
            </>
          )}
        </h1>
      </div>
    </div>
  );
}

export default Home;