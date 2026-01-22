import React, { useState, useEffect } from "react";
import Footer from "./Footer.jsx";
import PostFeed from "./PostFeed.jsx";
import ProfileSideBar from "./ProfileSideBar.jsx";
import Header from "./Header.jsx";
import { me, getPosts, getFollowers, getFollowing } from "../services/api";
import "./styles/Layout.css";
import CreatePost from "./CreatePost.jsx";

export const UserContext = React.createContext();

const Layout = ({ onLogout }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    try {
      const userResponse = await me();
      const userData = userResponse.data;

      const [postsResponse, followersResponse, followingResponse] =
        await Promise.all([getPosts(), getFollowers(), getFollowing()]);

      const userPosts = postsResponse.data.filter(
        (post) => post.userId === userData.id,
      );

      const normalizedUser = {
        ...userData,
        name: userData.name || `Usuario ${userData.id}`,
        username: userData.username || `usuario${userData.id}`,
        avatar_url: userData.avatar_url || "/dojo-connect.png",
        bio: userData.bio || "Practicante de artes marciales",
        posts_count: userPosts.length || 0,
        followers_count: followersResponse.data?.length || 0,
        following_count: followingResponse.data?.length || 0,
      };

      setUser(normalizedUser);
    } catch (error) {
      console.error("Error cargando datos:", error);
      setUser({
        name: "Usuario Demo",
        username: "demo",
        avatar_url: "/dojo-connect.png",
        bio: "Practicante de artes marciales",
        posts_count: 0,
        followers_count: 0,
        following_count: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const updateFollowCounters = async (
    incrementFollowers = 0,
    incrementFollowing = 0,
  ) => {
    if (!user) return;

    setUser((prevUser) => ({
      ...prevUser,
      followers_count: Math.max(
        0,
        prevUser.followers_count + incrementFollowers,
      ),
      following_count: Math.max(
        0,
        prevUser.following_count + incrementFollowing,
      ),
    }));
  };

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
    <UserContext.Provider value={{ user, updateFollowCounters }}>
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
    </UserContext.Provider>
  );
};

export default Layout;
