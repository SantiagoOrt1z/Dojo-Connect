import React, { useState, useEffect } from "react";
import { Form, Button, Card, Container, Image, Alert } from "react-bootstrap";
import { me, editInfoUser } from "../services/api";
import { useNavigate } from "react-router-dom";
import "./styles/EditProfile.css"; // ← Opcional, si querés estilos

const EditProfile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [user, setUser] = useState({
    name: "",
    username: "",
    bio: "",
    email: "",
    password: "",
    avatar_url: "/dojo-connect.png",
  });

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const response = await me();
        const userData = response.data;

        setUser({
          name: userData.name || "",
          username: userData.username || "",
          bio: userData.bio || "",
          email: userData.email || "",
          password: "",
          avatar_url: userData.avatar_url || "/dojo-connect.png",
        });
      } catch (error) {
        console.error("Error cargando perfil:", error);
        setError("No se pudieron cargar los datos del perfil");
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });

    if (error) setError("");
    if (success) setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    // Validaciones estrictas
    if (!user.name.trim()) {
      setError("El nombre es requerido");
      setSaving(false);
      return;
    }

    if (!user.username.trim()) {
      setError("El nombre de usuario es requerido");
      setSaving(false);
      return;
    }

    // ✅ Validar que email sea string (CRÍTICO)
    if (typeof user.email !== "string") {
      setError("Email inválido");
      setSaving(false);
      return;
    }

    try {
      console.log("Enviando datos de perfil...");

      // ✅ Enviar parámetros INDIVIDUALES, no objeto
      await editInfoUser(
        user.email, // string
        user.password || "", // string vacío si no hay password
        user.name, // string
        user.username, // string
        user.bio // string
      );

      setSuccess("¡Perfil actualizado correctamente!");

      // ✅ Redirección más suave
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 1500);
    } catch (error) {
      console.error("Error actualizando perfil:", error);

      // Manejo de errores específicos
      if (error.response?.status === 401) {
        setError("Sesión expirada. Por favor, volvé a iniciar sesión.");
      } else if (error.response?.status === 400) {
        setError("Datos inválidos: " + (error.response.data.message || ""));
      } else {
        setError(
          error.response?.data?.message || "Error al actualizar el perfil"
        );
      }
    } finally {
      setSaving(false);
    }
  };
  if (loading) {
    return (
      <Container
        className="mt-5 d-flex justify-content-center align-items-center"
        style={{ minHeight: "60vh" }}
      >
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-3">Cargando tu perfil...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-4" style={{ maxWidth: "800px" }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">✏️ Editar Perfil</h2>
        <Button variant="outline-secondary" onClick={() => navigate("/")}>
          ← Volver al inicio
        </Button>
      </div>

      {error && (
        <Alert variant="danger" dismissible onClose={() => setError("")}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert variant="success" dismissible onClose={() => setSuccess("")}>
          {success}
        </Alert>
      )}

      <Card className="shadow-sm border-0">
        <Card.Body className="p-4">
          <div className="text-center mb-4">
            <div className="position-relative d-inline-block">
              <Image
                src={user.avatar_url}
                roundedCircle
                className="border border-3 border-primary"
                style={{
                  width: "140px",
                  height: "140px",
                  objectFit: "cover",
                }}
              />
              <Button
                variant="outline-primary"
                size="sm"
                className="position-absolute bottom-0 end-0 rounded-circle"
                style={{ width: "36px", height: "36px" }}
                disabled
                title="Próximamente"
              >
                📷
              </Button>
            </div>
            <p className="text-muted mt-2 mb-0">
              Foto de perfil (próximamente podrás cambiarla)
            </p>
          </div>

          <Form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Nombre completo *</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                    placeholder="Ej: Juan Pérez"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">
                    Nombre de usuario *
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={user.username}
                    onChange={handleChange}
                    placeholder="Ej: juan_dojo"
                    required
                  />
                  <Form.Text className="text-muted">
                    Así te verán otros usuarios
                  </Form.Text>
                </Form.Group>
              </div>

              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={user.email}
                    disabled
                    className="bg-light"
                  />
                  <Form.Text className="text-muted">
                    El email no se puede modificar
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Nueva contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    placeholder="Dejar vacío para no cambiar"
                  />
                  <Form.Text className="text-muted">
                    Mínimo 6 caracteres
                  </Form.Text>
                </Form.Group>
              </div>
            </div>

            <Form.Group className="mb-4">
              <Form.Label className="fw-bold">Biografía</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="bio"
                value={user.bio}
                onChange={handleChange}
                placeholder="Cuéntanos sobre tu experiencia en artes marciales, tu dojo, grados..."
                style={{ resize: "none" }}
                maxLength={500}
              />
              <div className="d-flex justify-content-between mt-1">
                <Form.Text className="text-muted">
                  Comparte tu historia marcial
                </Form.Text>
                <small
                  className={`${
                    user.bio.length >= 480 ? "text-danger" : "text-muted"
                  }`}
                >
                  {user.bio.length}/500
                </small>
              </div>
            </Form.Group>

            <div className="d-flex justify-content-between pt-3 border-top">
              <Button
                variant="outline-danger"
                onClick={() => navigate("/")}
                disabled={saving}
              >
                Cancelar
              </Button>

              <div className="d-flex gap-2">
                <Button
                  variant="outline-secondary"
                  onClick={() => window.location.reload()}
                  disabled={saving}
                >
                  Restablecer
                </Button>

                <Button
                  variant="primary"
                  type="submit"
                  disabled={
                    saving || !user.name.trim() || !user.username.trim()
                  }
                  className="px-4"
                >
                  {saving ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                      ></span>
                      Guardando...
                    </>
                  ) : (
                    "💾 Guardar cambios"
                  )}
                </Button>
              </div>
            </div>
          </Form>
        </Card.Body>
      </Card>

      <Card className="mt-3 shadow-sm border-0">
        <Card.Body className="p-3">
          <h6 className="mb-2">ℹ️ Información adicional</h6>
          <ul className="list-unstyled text-muted small mb-0">
            <li>• Los campos con * son obligatorios</li>
            <li>• Los cambios se reflejarán inmediatamente</li>
            <li>• Próximamente podrás agregar tus artes marciales y grados</li>
          </ul>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EditProfile;
