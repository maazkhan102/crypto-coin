import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const CustomNavbar = () => {
  const isAuthenticated = false;

  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Crypto Bounce</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Left side links */}
          <Nav className="me-auto">
            <Nav.Link className="me-3" href="/">
              Home
            </Nav.Link>
            <Nav.Link className="me-3" href="/crypto">
              CryptoCurrencies
            </Nav.Link>
            <Nav.Link className="me-3" href="/blogs">
              Blogs
            </Nav.Link>
            <Nav.Link className="me-3" href="/submit">
              Submit a Blog
            </Nav.Link>
          </Nav>

          {/* Right side auth links */}
          <Nav className="ms-auto">
            {isAuthenticated ? (
              <Nav.Link className="me-3" href="/logout">
                Logout
              </Nav.Link>
            ) : (
              <>
                <Nav.Link className="me-3" href="/login">
                  Login
                </Nav.Link>
                <Nav.Link className="me-3" href="/signup">
                  Sign Up
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
