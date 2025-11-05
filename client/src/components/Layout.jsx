import React from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import PostFeed from "./PostFeed.jsx";
import ProfileSideBar from "./ProfileSideBar.jsx";
import "./styles/Layout.css";

const Layout = () => {
  const user = {
    name: "Santiago Ortiz",
    username: "santiago",
    avatar: "/default-avatar.png",
    posts: 12,
    followers: 150,
    following: 80,
    bio: "Amante del Jiu Jitsu y la programación.",
  };
  return (
    <div className="layout-container">
      <Header />
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
