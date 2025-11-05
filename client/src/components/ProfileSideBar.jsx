import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Image from "react-bootstrap/Image";
import "./styles/ProfileSideBar.css";

const ProfileSidebar = ({ user }) => {
  return (
    <Card className="profile-sidebar shadow-sm">
      <Card.Body className="text-center">
        <Image
          src={user.avatar || "/default-avatar.png"}
          roundedCircle
          className="profile-avatar mb-3"
        />
        <Card.Title>{user.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          @{user.username}
        </Card.Subtitle>
      </Card.Body>

      <ListGroup variant="flush" className="text-center">
        <ListGroup.Item>
          <strong>{user.posts}</strong>
          <div className="text-muted small">Posts</div>
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>{user.followers}</strong>
          <div className="text-muted small">Seguidores</div>
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>{user.following}</strong>
          <div className="text-muted small">Siguiendo</div>
        </ListGroup.Item>
      </ListGroup>

      <Card.Body>
        <Card.Title className="h6">Sobre mí</Card.Title>
        <Card.Text className="text-muted small">
          {user.bio || "Este usuario aún no escribió una biografía."}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProfileSidebar;
