import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";

const NavComponent = () => {
  return (
    <Navbar expand="lg" className="bg-secondary">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Link
            to="/dashboard"
            id="link"
            className="nav-link demo text-dark text-md"
          >
            Dashboard
          </Link>
          <Link
            to="/blog"
            id="link"
            className="nav-link demo text-dark text-md"
          >
            Blog
          </Link>
    </Nav>
        <Nav>
          <Nav.Link href="/" style={{ marginRight: "10px" }}>
            <div
              style={{
                backgroundColor: "#dc3545",
                color: "#fff",
                borderRadius: "5px",
                padding: "5px 10px",
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
