import React from "react";
import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import LoginForm from "./components/LoginForm.jsx";
import RegisterForm from "./components/RegisterForm.jsx";

function App() {
  const [isAuth, setIsAuth] = React.useState(false);

  return (
    <BrowserRouter>
      <Routes>
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
