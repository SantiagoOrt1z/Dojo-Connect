import { Form, Button, Card, Container } from "react-bootstrap";
import "./styles/RegisterForm.css";
import { useState } from "react";

const RegisterForm = () => {
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

  const registerUser = (e) => {
    e.preventDefault();
    console.log("Datos a enviar:", user);
  };

  return (
    <Container className="register-container d-flex align-items-center justify-content-center">
      <Card className="register-card p-4 shadow-sm">
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
              Registrarse
            </Button>

            <div className="text-center mt-3">
              <span>¿Tenés cuenta? </span>
              <a href="#">Inicia Sesion</a>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default RegisterForm;
