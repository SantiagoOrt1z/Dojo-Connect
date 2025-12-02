import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { FaComment } from "react-icons/fa";
import { GiPunch } from "react-icons/gi";
import { getComments, addComment } from "../services/api";
import "./styles/PostCard.css";

const PostCard = ({
  user,
  content,
  imageUrl,
  initialLikes = 0,
  avatar,
  postId,
}) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [bump, setBump] = useState(false);

  // Cargar comentarios cuando se muestren
  useEffect(() => {
    if (showComments && postId) {
      loadComments();
    }
  }, [showComments, postId]);

  const loadComments = async () => {
    try {
      const response = await getComments(postId);
      setComments(response.data);
    } catch (error) {
      console.error("Error cargando comentarios:", error);
    }
  };

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

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      await addComment(postId, newComment);
      setNewComment("");
      loadComments(); // Recargar comentarios
    } catch (error) {
      console.error("Error agregando comentario:", error);
    }
  };

  return (
    <Card className="mb-3 shadow-sm post-card">
      <Card.Header className="d-flex align-items-center">
        <img
          src={avatar || "dojo-connect.png"}
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
            variant={showComments ? "primary" : "outline-secondary"}
            size="sm"
            onClick={() => setShowComments(!showComments)}
          >
            <FaComment /> Comentar ({comments.length})
          </Button>
        </div>

        {/* SECCIÓN DE COMENTARIOS */}
        {showComments && (
          <div className="comments-section mt-3">
            {/* Lista de comentarios */}
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="comment-item mb-2 p-2 border rounded"
              >
                <strong>{comment.email}:</strong> {comment.content}
              </div>
            ))}

            {/* Formulario para nuevo comentario */}
            <div className="comment-form mt-3">
              <textarea
                className="form-control"
                placeholder="Escribe un comentario..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows="2"
              />
              <Button
                variant="primary"
                size="sm"
                className="mt-2"
                onClick={handleAddComment}
                disabled={!newComment.trim()}
              >
                Comentar
              </Button>
            </div>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default PostCard;
