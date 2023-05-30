import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";



//css
import "../style/Navbar.css";
function NavbarMain() {
  return (
    <Navbar expand="lg" className="main-navbar">
      <Container className="nav-container" fluid>
        {/*leftside*/}
        <Navbar.Collapse id="basic-navbar-nav" className="order-lg-1 order-3">
          <Nav className="ms-auto">
            <Nav.Link
              href="#home"
              className="text-uppercase mx-lg-2 nav-color active"
            >
              Home
            </Nav.Link>
            <Nav.Link href="#home" className="text-uppercase mx-lg-2">
              About
            </Nav.Link>
            <Nav.Link href="#home" className="text-uppercase mx-lg-2">
              Donation
            </Nav.Link>
            <Nav.Link href="#home" className="text-uppercase mx-lg-2">
              News
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        {/*center logo*/}
        <Navbar.Brand href="#home" className="order-1 nav-brand me-1 ms-1">
          <div className="nav-main-logo" ></div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="order-2" />
        {/*right side*/}

        <Navbar.Collapse id="basic-navbar-nav" className="order-lg-3 order-4">
          <Nav className="me-auto">
            <Nav.Link href="#home" className="text-uppercase mx-lg-2">
              Gallery
            </Nav.Link>
            <Nav.Link href="#home" className="text-uppercase mx-lg-2">
              Contact
            </Nav.Link>
            <Nav.Link href="#home" className="text-uppercase mx-lg-2">
              login
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>

        <div className="nav-icon d-flex order-lg-4 order">
          <div className="nav-facebook">
            <a href="" className="nav-link">
              <i className="fa-brands fa-square-facebook"></i>
            </a>
          </div>
          <div className="nav-insta">
            <a href="" className="nav-link">
              <i class="fa-brands fa-instagram"></i>
            </a>
          </div>
        </div>
      </Container>
    </Navbar>
  );
}

export default NavbarMain;
