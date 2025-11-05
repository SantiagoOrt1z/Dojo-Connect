import React from "react";
import PostCard from "./PostCard";

const PostFeed = () => {
  const posts = [
    {
      id: 1,
      user: "Santiago Ortiz",
      content: "Primer post de Dojo Connect 💪",
      imageUrl: "dojo-connect.png",
    },
    {
      id: 2,
      user: "Mica",
      content: "¡Entrenamiento duro hoy! 🥋",
      imageUrl: "",
    },
  ];

  return (
    <div className="container mt-3">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          user={post.user}
          content={post.content}
          imageUrl={post.imageUrl}
        />
      ))}
    </div>
  );
};

export default PostFeed;
