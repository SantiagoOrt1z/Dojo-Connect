import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import LoginForm from "./components/LoginForm.jsx";
import RegisterForm from "./components/RegisterForm.jsx";
import EditProfile from "./components/EditProfile.jsx";
import { me } from "./services/api";

function App() {
  const [isAuth, setIsAuth] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await me();
        console.log("✅ Sesión activa encontrada para:", response.data.email);
        setIsAuth(true);
      } catch (error) {
        console.log("🔐 No hay sesión activa, redirigiendo a login");
        setIsAuth(false);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const handleLoginSuccess = () => {
    setIsAuth(true);
  };

  const handleLogout = () => {
    setIsAuth(false);
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "linear-gradient(135deg, #1e1e2f, #343454)",
          color: "white",
        }}
      >
        <div className="text-center">
          <div
            className="spinner-border"
            role="status"
            style={{ width: "3rem", height: "3rem" }}
          >
            <span className="visually-hidden">Cargando...</span>
          </div>
          <h4 className="mt-3">Dojo Connect</h4>
          <p>Verificando sesión...</p>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            isAuth ? (
              <Navigate to="/" replace />
            ) : (
              <LoginForm onSesionSuccess={handleLoginSuccess} />
            )
          }
        />

        <Route
          path="/register"
          element={
            isAuth ? (
              <Navigate to="/" replace />
            ) : (
              <RegisterForm onSesionSuccess={handleLoginSuccess} />
            )
          }
        />

        <Route
          path="/"
          element={
            isAuth ? (
              <Layout onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/profile/edit"
          element={isAuth ? <EditProfile /> : <Navigate to="/login" replace />}
        />

        <Route
          path="*"
          element={<Navigate to={isAuth ? "/" : "/login"} replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
