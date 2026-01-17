import React from "react";
import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import LoginForm from "./components/LoginForm.jsx";
import RegisterForm from "./components/RegisterForm.jsx";
import EditProfile from "./components/EditProfile.jsx"; // ← Importar nuevo componente

function App() {
  const [isAuth, setIsAuth] = React.useState(false);

  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta pública - Login */}
        <Route
          path="/login"
          element={
            isAuth ? (
              <Navigate to="/" replace />
            ) : (
              <LoginForm onSesionSuccess={() => setIsAuth(true)} />
            )
          }
        />

        {/* Ruta pública - Registro */}
        <Route
          path="/register"
          element={
            isAuth ? (
              <Navigate to="/" replace />
            ) : (
              <RegisterForm onSesionSuccess={() => setIsAuth(true)} />
            )
          }
        />

        {/* Ruta protegida - Layout principal */}
        <Route
          path="/"
          element={
            isAuth ? (
              <Layout onLogout={() => setIsAuth(false)} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Ruta protegida - Editar perfil (NUEVA) */}
        <Route
          path="/profile/edit"
          element={isAuth ? <EditProfile /> : <Navigate to="/login" replace />}
        />

        {/* Ruta catch-all - Redirige a home si autenticado, sino a login */}
        <Route
          path="*"
          element={
            isAuth ? (
              <Navigate to="/" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
