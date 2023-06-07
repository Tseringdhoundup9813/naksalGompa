import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

//logo
import logoImg from "../images/logo/logo.png";
//router
import { NavLink } from "react-router-dom";
//css
import "../style/Navbar.css";
function NavbarMain() {
  return (
    <Navbar expand="lg" className="main-navbar">
      <Container className="nav-container" fluid>
        {/*leftside*/}
        <Navbar.Collapse id="basic-navbar-nav" className="order-lg-1 order-3">
          <Nav className="ms-auto">
            <NavLink
              to="/"
              className=" nav-link text-uppercase mx-lg-2 nav-color "
            >
              Home
            </NavLink>

            <NavDropdown title="ABOUT" id="basic-nav-dropdown">
              <NavLink
                to="/about/history"
                className="dropdown-item text-uppercase"
              >
                History
              </NavLink>
              <NavLink
                to="/about/founder"
                className="dropdown-item text-uppercase"
              >
                founder
              </NavLink>
              <NavLink
                to="/about/director"
                className="dropdown-item text-uppercase"
              >
                Director
              </NavLink>
              <NavLink
                to="/about/our-team"
                className="dropdown-item text-uppercase"
              >
                OurTeam
              </NavLink>
              <NavLink
                to="/about/our-student"
                className="dropdown-item text-uppercase"
              >
                Total Student
              </NavLink>
            </NavDropdown>

            <NavLink to="/donation" className="nav-link text-uppercase mx-lg-2">
              Donation
            </NavLink>
            <NavLink to="/news" className="nav-link text-uppercase mx-lg-2">
              News
            </NavLink>
          </Nav>
        </Navbar.Collapse>
        {/*center logo*/}
        <Navbar.Brand href="#home" className="order-1 nav-brand me-1 ms-1">
          <div className="nav-main-logo">
            <img src={logoImg} className="img-fluid" alt="" />
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="order-2" />
        {/*right side*/}

        <Navbar.Collapse id="basic-navbar-nav" className="order-lg-3 order-4">
          <Nav className="me-auto">
            <NavLink to="/gallery" className="nav-link text-uppercase mx-lg-2">
              gallery
            </NavLink>
            <NavLink to="/contact" className="nav-link text-uppercase mx-lg-2">
              contact
            </NavLink>
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
