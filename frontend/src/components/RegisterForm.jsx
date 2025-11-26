import { Form, Button, Card, Container } from "react-bootstrap";
import "./styles/RegisterForm.css";
import { useState } from "react";
import { register } from "../services/api";
import { Link } from "react-router-dom";

const RegisterForm = (props) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      const response = await register(user.email, user.password);
      console.log("Registro exitoso:", response.data);
      props.onSesionSuccess();
    } catch (error) {
      console.error("Error en registro:", error);
    }
  };

  return (
    <Container className="register-container d-flex align-items-center justify-content-center">
      <Card className="register-card p-4 shadow-sm">
        <Card.Body>
          <h2 className="text-center mb-4">Registrarse</h2>
          <Form onSubmit={registerUser}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control
                name="email"
                type="email"
                value={user.email}
                onChange={handleChange}
                placeholder="Ingresa tu correo"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                name="password"
                type="password"
                value={user.password}
                onChange={handleChange}
                placeholder="Ingresa tu contraseña"
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mt-3">
              Registrarse
            </Button>

            <div className="text-center mt-3">
              <span>¿Tenés cuenta? </span>
              <Link
                to="/login"
                className="text-decoration-none text-primary fw-bold"
              >
                Iniciar Sesion
              </Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default RegisterForm;
