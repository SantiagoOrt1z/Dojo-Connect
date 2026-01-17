import React, { useState, useEffect } from "react";
import PostCard from "./PostCard";
import { getPosts } from "../services/api.js";

const PostFeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPosts();
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div className="container mt-3 text-center">Cargando posts...</div>;
  }

  return (
    <div className="container mt-3">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          user={post.user_name || post.username}
          content={post.content}
          imageUrl={post.post_image}
          initialLikes={parseInt(post.likes_count) || 0}
          initialCommentsCount={parseInt(post.comments_count) || 0}
          avatar={post.avatar_url}
          postId={post.id}
        />
      ))}
    </div>
  );
};

export default PostFeed;
