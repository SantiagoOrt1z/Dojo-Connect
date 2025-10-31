import React from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import PostFeed from "./PostFeed.jsx";
import ProfileSideBar from "./ProfileSideBar.jsx";
import "./styles/Layout.css";

const Layout = () => {
  return (
    <div className="layout-container">
      <Header />
      <main className="main-content">
        <div className="feed-section">
          <PostFeed />
        </div>
        <aside className="sidebar-section">
          <ProfileSideBar />
        </aside>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
