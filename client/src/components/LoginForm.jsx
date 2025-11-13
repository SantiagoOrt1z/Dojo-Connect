import { Form, Button, Card, Container } from "react-bootstrap";
import "./styles/LoginForm.css";

const LoginForm = () => {
  return (
    <Container className="login-container d-flex align-items-center justify-content-center">
      <Card className="login-card p-4 shadow-sm">
        <Card.Body>
          <h2 className="text-center mb-4">Iniciar sesión</h2>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control type="email" placeholder="Ingresa tu correo" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingresa tu contraseña"
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mt-3">
              Entrar
            </Button>

            <div className="text-center mt-3">
              <span>¿No tenés cuenta? </span>
              <a href="#">Registrate</a>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LoginForm;
