import React from "react";
import { Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Header from "./components/Header.jsx";

function App() {
  return (
    <>
      <Header />
      <Layout />
    </>
  );
}

export default App;
