import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const NavComponent = () => {
  return (
    <Navbar expand="lg" className="bg-secondary">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
      <Nav.Link href="/dashboard" className="text-white">Dashboard</Nav.Link>
      <Nav.Link href="/blog" className="text-white">Blog</Nav.Link>
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
