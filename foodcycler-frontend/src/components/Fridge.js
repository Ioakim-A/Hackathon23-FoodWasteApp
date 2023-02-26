import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import fridgeImgHover from '../assets/fridge_open.png';
import fridgeImg from '../assets/fridge_closed.png';
import './Fridge.css';

const Fridge = () => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div className="fridge-container">
      <Link to="/fridgeContents">
        <img className="fridge-img" src={isHovering ? fridgeImgHover : fridgeImg} alt="Fridge" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} />
      </Link>
    </div>
  );
};

export default Fridge;