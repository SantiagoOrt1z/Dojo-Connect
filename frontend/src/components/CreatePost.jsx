// CreatePost.jsx - VERSIÓN SEGURA
import React, { useState } from "react";
import { Button, Form, Card } from "react-bootstrap";
import { createPost } from "../services/api";

const CreatePost = () => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    try {
      await createPost(content);
      setContent("");
      alert("¡Post publicado! Recarga la página para verlo.");
    } catch (error) {
      console.error("Error:", error);
      alert("Error al publicar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="¿Qué estás practicando hoy?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              maxLength={500}
            />
            <div className="d-flex justify-content-between align-items-center mt-2">
              <small className="text-muted">{content.length}/500</small>
              <Button
                type="submit"
                variant="primary"
                disabled={!content.trim() || loading}
              >
                {loading ? "Publicando..." : "Publicar"}
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default CreatePost;
