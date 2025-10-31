import React from "react";
import { Container } from "react-bootstrap";
import "./styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer-dojo">
      <Container className="text-center py-3">
        <p className="mb-1">
          © 2025 Dojo Connect. Todos los derechos reservados.
        </p>
        <div className="footer-links">
          <a href="#">Política de Privacidad</a>
          <a href="#">Términos de Uso</a>
          <a href="#">Contacto</a>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
