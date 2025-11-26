import React from "react";
import Footer from "./Footer.jsx";
import PostFeed from "./PostFeed.jsx";
import ProfileSideBar from "./ProfileSideBar.jsx";
import Header from "./Header.jsx";
import "./styles/Layout.css";

const Layout = ({ onLogout }) => {
  const [user, setUser] = React.useState({});

  /*const user = {
    name: "Santiago Ortiz",
    username: "santiago",
    avatar: "/dojo-connect.png",
    posts: 12,
    followers: 150,S
    following: 80,
    bio: "Amante del Jiu Jitsu y la programación.",
  };*/
  return (
    <div className="layout-container">
      <Header onLogout={onLogout} />
      <main className="main-content">
        <div className="feed-section">
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
