import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Image from "react-bootstrap/Image";
import "./styles/ProfileSideBar.css";

const ProfileSidebar = ({ user }) => {
  if (!user) {
    return (
      <Card className="profile-sidebar shadow-sm">
        <Card.Body className="text-center">
          <p>Cargando perfil...</p>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="profile-sidebar shadow-sm">
      <Card.Body className="text-center">
        <Image
          src={user.avatar_url || "./dojo-connect.png"}
          roundedCircle
          className="profile-avatar mb-3"
        />
        <Card.Title>{user.name || "Usuario"}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          @{user.username || "usuario"}
        </Card.Subtitle>
      </Card.Body>

      <ListGroup variant="flush" className="text-center">
        <ListGroup.Item>
          <strong>{user.posts_count || 0}</strong>
          <div className="text-muted small">Posts</div>
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>{user.followers_count || 0}</strong>
          <div className="text-muted small">Seguidores</div>
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>{user.following_count || 0}</strong>
          <div className="text-muted small">Siguiendo</div>
        </ListGroup.Item>
      </ListGroup>

      <Card.Body>
        <Card.Title className="h6">Sobre mí</Card.Title>
        <Card.Text className="text-muted small">
          {user.bio || "Este usuario aún no escribió una biografía."}
        </Card.Text>
      </Card.Body>

      <Card.Body>
        <Card.Title className="h6">Artes marciales</Card.Title>
        <Card.Text className="text-muted small">Próximamente...</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProfileSidebar;
