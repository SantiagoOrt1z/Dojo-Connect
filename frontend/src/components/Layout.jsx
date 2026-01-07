import React, { useState, useEffect } from "react";
import Footer from "./Footer.jsx";
import PostFeed from "./PostFeed.jsx";
import ProfileSideBar from "./ProfileSideBar.jsx";
import Header from "./Header.jsx";
import { me } from "../services/api";
import "./styles/Layout.css";
import CreatePost from "./CreatePost.jsx";

const Layout = ({ onLogout }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await me();

        // Normalizar datos del usuario
        const userData = {
          ...response.data,
          name: response.data.name || `Usuario ${response.data.id}`,
          username: response.data.username || `usuario${response.data.id}`,
          avatar_url: response.data.avatar_url || "/dojo-connect.png",
          bio: response.data.bio || "Practicante de artes marciales",
          posts_count: 0,
          followers_count: 0,
          following_count: 0,
        };

        setUser(userData);
      } catch (error) {
        console.error("Error cargando datos:", error);
        // Datos de ejemplo
        setUser({
          name: "Usuario Demo",
          username: "demo",
          avatar_url: "/dojo-connect.png",
          bio: "Practicante de artes marciales",
          posts_count: 5,
          followers_count: 10,
          following_count: 8,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);
  if (loading) {
    return (
      <div className="layout-container">
        <Header onLogout={onLogout} />
        <div className="text-center mt-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="layout-container">
      <Header user={user} onLogout={onLogout} />
      <main className="main-content">
        <div className="feed-section">
          <CreatePost onPostCreated={() => window.location.reload()} />
          <PostFeed />
        </div>
        <aside className="sidebar-section">
          <ProfileSideBar user={user} />
        </aside>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
