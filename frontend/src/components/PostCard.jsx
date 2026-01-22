import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { FaComment } from "react-icons/fa";
import { GiPunch } from "react-icons/gi";
import { getComments, addComment, likePost, unlikePost } from "../services/api";
import "./styles/PostCard.css";
import FollowButton from "./FollowButton.jsx";
import { me } from "../services/api.js";

const PostCard = ({
  user,
  content,
  imageUrl,
  initialLikes = 0,
  initialCommentsCount = 0,
  avatar,
  postId,
  postUserId,
}) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentsCount, setCommentsCount] = useState(initialCommentsCount);
  const [newComment, setNewComment] = useState("");
  const [bump, setBump] = useState(false);
  const [loadingLike, setLoadingLike] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await me();
        setCurrentUser(response.data);
      } catch (error) {
        console.error("Error obteniendo usuario actual:", error);
      }
    };

    fetchCurrentUser();
  }, []);

  useEffect(() => {
    if (showComments && postId) {
      loadComments();
    }
  }, [showComments, postId]);

  const loadComments = async () => {
    try {
      const response = await getComments(postId);
      setComments(response.data);
      setCommentsCount(response.data.length);
    } catch (error) {
      console.error("Error cargando comentarios:", error);
    }
  };

  const handleLike = async () => {
    if (loadingLike) return;

    setLoadingLike(true);
    setBump(true);

    try {
      if (liked) {
        // SI ya está liked → quitar like (unlike)
        const response = await unlikePost(postId);
        setLikes(response.data.likes || Math.max(0, likes - 1)); // No menor que 0
        setLiked(false);
      } else {
        // NO está liked → dar like
        const response = await likePost(postId);
        setLikes(response.data.likes || likes + 1);
        setLiked(true);
      }
    } catch (error) {
      console.error("Error en like:", error);
      // Revertir visualmente
      setLiked(!liked);
    } finally {
      setLoadingLike(false);
      setTimeout(() => setBump(false), 300);
    }
  };

  const handleAddComment = async (e) => {
    if (e) e.preventDefault();
    if (!newComment.trim()) return;

    try {
      await addComment(postId, newComment);
      setNewComment("");
      await loadComments();
    } catch (error) {
      console.error("Error agregando comentario:", error);
    }
  };

  return (
    <Card className="mb-3 shadow-sm post-card">
      <Card.Header className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <img
            src={avatar || "dojo-connect.png"}
            alt="avatar"
            className="rounded-circle me-2"
            height="40"
            width="40"
          />
          <div>
            <strong>{user}</strong>
            <div className="small text-muted">@{postUserId}</div>
          </div>
        </div>

        <FollowButton
          targetUserId={postUserId}
          currentUserId={currentUser?.id}
          small={true}
        />
      </Card.Header>

      {imageUrl && <Card.Img variant="top" src={imageUrl} />}

      <Card.Body>
        <Card.Text>{content}</Card.Text>

        <div className="d-flex justify-content-around mt-3 align-items-center">
          <Button
            variant={liked ? "primary" : "outline-primary"}
            size="sm"
            className={`like-btn ${liked ? "liked" : ""} ${
              loadingLike ? "loading" : ""
            }`}
            onClick={handleLike}
            disabled={loadingLike}
          >
            <GiPunch className="like-icon" />
            {loadingLike ? "..." : "Oss"}
          </Button>

          <span className={`like-count ${bump ? "bump" : ""}`}>
            {likes} Oss
          </span>

          <Button
            variant={showComments ? "primary" : "outline-secondary"}
            size="sm"
            onClick={() => setShowComments(!showComments)}
          >
            <FaComment /> Comentar ({commentsCount})
          </Button>
        </div>

        {showComments && (
          <div className="comments-section mt-3">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="comment-item mb-2 p-2 border rounded"
              >
                <strong>{comment.email}:</strong> {comment.content}
              </div>
            ))}

            <form onSubmit={handleAddComment} className="comment-form mt-3">
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
                type="submit"
                disabled={!newComment.trim()}
              >
                Comentar
              </Button>
            </form>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default PostCard;
