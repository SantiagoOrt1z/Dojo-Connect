import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { FaComment } from "react-icons/fa";
import { GiPunch } from "react-icons/gi";
import "./styles/PostCard.css";

const PostCard = ({ user, content, imageUrl }) => {
  return (
    <Card className="mb-3 shadow-sm post-card">
      <Card.Header className="d-flex align-items-center">
        <img
          src="dojo-connect.png"
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

        <div className="d-flex justify-content-around mt-3">
          <Button variant="outline-primary" size="sm">
            <GiPunch /> Oss
          </Button>
          <Button variant="outline-secondary" size="sm">
            <FaComment /> Comentar
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default PostCard;
