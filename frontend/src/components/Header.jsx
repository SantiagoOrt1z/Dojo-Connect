import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./styles/Header.css";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../services/api.js";

function Header({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      onLogout();
      navigate("/login");
    } catch (error) {
      console.error("Error en logout", error);
    }
  };

  return (
    <Navbar expand="lg" className="nav-bar-1 shadow-sm px-3">
      <Container fluid>
        <Navbar.Brand>
          <Link to="/" className="text-decoration-none">
            <img
              src="dojo-connect.png"
              alt="Dojo Connect"
              height="40"
              className="me-2"
            />
          </Link>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto">
            <Link to="/" className="nav-link">
              Inicio
            </Link>
          </Nav>

          <Nav className="ms-auto">
            {user && (
              <NavDropdown
                align="end"
                title={
                  <span className="d-flex align-items-center">
                    <img
                      src={user.avatar_url || "/dojo-connect.png"}
                      alt="avatar"
                      width="30"
                      height="30"
                      className="rounded-circle me-2"
                    />
                    <span className="user-name">
                      {user.name || user.username}
                    </span>
                  </span>
                }
                id="navbarScrollingDropdown"
              >
                <NavDropdown.Item as={Link} to="/profile">
                  Mi perfil
                </NavDropdown.Item>

                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  Cerrar sesión
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
