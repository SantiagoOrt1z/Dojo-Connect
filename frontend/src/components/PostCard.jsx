import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { FaComment } from "react-icons/fa";
import { GiPunch } from "react-icons/gi";
import "./styles/PostCard.css";

const PostCard = ({ user, content, imageUrl, initialLikes = 0 }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);
  const [showComment, setShowComment] = useState(false);
  const [bump, setBump] = useState(false);

  const handleLike = () => {
    if (!liked) {
      setLikes(likes + 1);
    } else {
      setLikes(likes - 1);
    }
    setLiked(!liked);

    setBump(true);
    setTimeout(() => setBump(false), 300);
  };

  return (
    <Card className="mb-3 shadow-sm post-card">
      <Card.Header className="d-flex align-items-center">
        <img
          src={"dojo-connect.png"}
          alt="avatar"
          className="rounded-circle me-2"
          height="40"
          width="40"
        />
        <strong>{user}</strong>
      </Card.Header>

      {imageUrl && <Card.Img variant="top" src={imageUrl} />}

      <Card.Body>
        <Card.Text>{content}</Card.Text>

        <div className="d-flex justify-content-around mt-3 align-items-center">
          <Button
            variant={liked ? "primary" : "outline-primary"}
            size="sm"
            className={`like-btn ${liked ? "liked" : ""}`}
            onClick={handleLike}
          >
            <GiPunch className="like-icon" /> Oss
          </Button>

          <span className={`like-count ${bump ? "bump" : ""}`}>
            {likes} Oss
          </span>

          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => setShowComment(!showComment)}
          >
            <FaComment /> Comentar
          </Button>
        </div>

        {showComment && (
          <textarea
            className="comment-box mt-3"
            placeholder="Escribe un comentario..."
          ></textarea>
        )}
      </Card.Body>
    </Card>
  );
};

export default PostCard;
