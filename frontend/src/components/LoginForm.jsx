import { Form, Button, Card, Container } from "react-bootstrap";
import "./styles/LoginForm.css";
import { useState } from "react";
import { login } from "../services/api";
import { Link } from "react-router-dom";

const LoginForm = (props) => {
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

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const response = await login(user.email, user.password);
      props.onSesionSuccess();
    } catch (error) {
      console.error("Error en login:", error);
    }
  };

  return (
    <Container className="login-container d-flex align-items-center justify-content-center">
      <Card className="login-card p-4 shadow-sm">
        <Card.Body>
          <h2 className="text-center mb-4">Iniciar sesión</h2>
          <Form onSubmit={loginUser}>
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
              Entrar
            </Button>

            <div className="text-center mt-3">
              <span>¿No tenés cuenta? </span>
              <Link
                to="/register"
                className="text-decoration-none text-primary fw-bold"
              >
                Registrate
              </Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LoginForm;
