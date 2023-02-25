import React, { useState } from 'react';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import capitalizeFirstLetter from '../utils/capitalizeFirstLetter';
import getUserNameFromSessionID from '../utils/getUserNameFromSessionID';
import './Header.css';

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);

  // Check if a session ID is present in localStorage
  const sessionID = localStorage.getItem('sessionID');
  if (sessionID && !username) {
    // Extract the username from the session ID and set the state
    console.log(sessionID)
    setUsername(capitalizeFirstLetter(getUserNameFromSessionID(sessionID)));
  }

  // Handler for logout click
  const handleLogout = () => {
    localStorage.removeItem('sessionID');
    setUsername(null);
    navigate('/home');
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
            <Nav.Link as={Link} to="/" className="nav-link">
              Fridge
            </Nav.Link>
            <Nav.Link as={Link} to="/" className="nav-link">
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
              <NavDropdown
                title={username}
                className="justify-content-end"
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
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

export default Header;