import React, { useState } from 'react';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import capitalizeFirstLetter from '../utils/capitalizeFirstLetter';
import getUserNameFromSessionID from '../utils/getUserNameFromSessionID';

import beginner from '../assets/beginner.png';
import bronze from '../assets/bronze.png';
import silver from '../assets/silver.png';
import gold from '../assets/gold.png';
import platinum from '../assets/platinum.png';
import expert from '../assets/expert.png';

import './Header.css';

function Header() {
  const location = useLocation();
  const [username, setUsername] = useState(null);
  const [userRank, setUserRank] = useState(null);

  const badgeDictionary = {
    1: beginner,
    2: bronze,
    3: silver,
    4: gold,
    5: platinum,
    6: expert
  };

  const sessionID = localStorage.getItem('sessionID');
  if (sessionID && !username) {
    console.log(sessionID)
    setUsername(capitalizeFirstLetter(getUserNameFromSessionID(sessionID)));
    setUserRank(6)
  }

  const handleLogout = () => {
    localStorage.removeItem('sessionID');
    setUsername(null);
    setUserRank(null);
    window.location.href = '/';
  };

  return (
    <Navbar bg="light" expand="lg" className="navbar">
      <Container>
        <Navbar.Brand href="/" className="title">
          Food<b>Cycler</b>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/fridgeContents" className="nav-link">
              Fridge
            </Nav.Link>
            <Nav.Link as={Link} to="/recipes" className="nav-link">
              Recipes
            </Nav.Link>
            <Nav.Link as={Link} to="/market" className="nav-link">
              Market
            </Nav.Link>
            <Nav.Link as={Link} to="/" className="nav-link">
              Savings
            </Nav.Link>
          </Nav>
          <Nav>
            {username ? (
              <>
                <NavDropdown
                  title={username}
                  className="justify-content-end"
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item>
                    View Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
                {userRank && (
                  <div className='badge-container'><img src={badgeDictionary[userRank]} alt={`Badge ${userRank}`} className="badge-image" /></div>
                )}
              </>
            ) : (
              location.pathname !== '/loginUser' && (
                <Nav.Link as={Link} to="/loginUser" className="nav-link">
                  Login
                </Nav.Link>
              )
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header
