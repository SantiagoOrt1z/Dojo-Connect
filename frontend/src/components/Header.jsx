import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./styles/Header.css";

function Header() {
  const user = {
    name: "Santiago Ortiz",
    avatar: "/dojo-connect.png",
  };

  return (
    <Navbar expand="lg" className="nav-bar-1 shadow-sm px-3">
      <Container fluid>
        <Navbar.Brand href="#">
          <img
            src="dojo-connect.png"
            alt="Dojo Connect"
            height="40"
            className="me-2"
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto">
            <Nav.Link href="#inicio">Inicio</Nav.Link>
          </Nav>

          <Nav className="ms-auto">
            <NavDropdown
              align="end"
              title={
                <span className="d-flex align-items-center">
                  <img
                    src={user.avatar}
                    alt="avatar"
                    width="30"
                    height="30"
                    className="rounded-circle me-2"
                  />
                  <span className="user-name">{user.name}</span>
                </span>
              }
              id="navbarScrollingDropdown"
            >
              <NavDropdown.Item href="#perfil">Mi perfil</NavDropdown.Item>
              <NavDropdown.Item href="#configuracion">
                Configuración
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#logout">Cerrar sesión</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
