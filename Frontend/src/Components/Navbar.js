import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

const NavComponent = () => {
  const handleLogout = () => {
    localStorage.clear(); 
    window.location.href = "/"; 
  };

  return (
    <Navbar expand="lg" className="bg-secondary">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Link
            to="/dashboard"
            id="link"
            className="nav-link demo text-white  text-md ml-10"
            activeClassName="active"
          >
            Dashboard
          </Link>

          <Link
            to="/blog"
            id="link"
            className="nav-link demo text-white  text-md ml-2"
            activeClassName="active"
          >
            Blog
          </Link>
        </Nav>
        <Nav>
          <Nav.Link href="/" style={{ marginRight: "0.625rem" }} onClick={handleLogout}>
            <div
              style={{
                backgroundColor: "#dc3545",
                color: "#fff",
                borderRadius: "0.3125rem",
                padding: "0.3125rem",
              }}
            >
              Logout
            </div>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavComponent;
