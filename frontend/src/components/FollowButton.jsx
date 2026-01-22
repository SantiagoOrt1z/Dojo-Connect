// src/components/FollowButton.jsx - VERSIÓN CORREGIDA
import React, { useState, useEffect, useContext } from "react";
import { Button } from "react-bootstrap";
import {
  followUser,
  unfollowUser,
  getFollowing, // ¡USA ESTE!
} from "../services/api.js";
import { FaUserPlus, FaUserCheck } from "react-icons/fa";
import { UserContext } from "./Layout.jsx";

const FollowButton = ({ targetUserId, currentUserId, small = false }) => {
  const [isFollowing, setIsFollowing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const { updateFollowCounters } = useContext(UserContext);

  // Verificar estado inicial USANDO getFollowing
  useEffect(() => {
    const checkStatus = async () => {
      if (!currentUserId || !targetUserId || currentUserId === targetUserId) {
        setLoading(false);
        setIsFollowing(false);
        return;
      }

      try {
        console.log("📡 Llamando a getFollowing() para verificar...");
        const response = await getFollowing();

        // Buscar si targetUserId está en la lista de seguidos
        const followingList = response.data || [];
        const isUserFollowed = followingList.some(
          (user) =>
            user.id === Number(targetUserId) ||
            user.userId === Number(targetUserId),
        );

        console.log("✅ Usuario seguido?", isUserFollowed);
        setIsFollowing(isUserFollowed);
      } catch (error) {
        console.error("Error obteniendo lista de seguidos:", error);
        setIsFollowing(false);
      } finally {
        setLoading(false);
      }
    };

    checkStatus();
  }, [currentUserId, targetUserId]);

  const handleFollowToggle = async () => {
    if (!currentUserId || currentUserId === targetUserId) return;

    setActionLoading(true);
    try {
      if (isFollowing) {
        await unfollowUser(targetUserId);
        setIsFollowing(false);
        if (updateFollowCounters) {
          updateFollowCounters(0, -1);
        }
      } else {
        await followUser(targetUserId);
        setIsFollowing(true);
        if (updateFollowCounters) {
          updateFollowCounters(0, 1);
        }
      }
    } catch (error) {
      console.error("Error en follow/unfollow:", error);
      alert(error.response?.data?.error || "Error al actualizar seguimiento");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading || isFollowing === null) {
    return (
      <Button
        variant="outline-secondary"
        size={small ? "sm" : "md"}
        disabled
        style={{ minWidth: small ? "90px" : "110px" }}
      >
        <span className="spinner-border spinner-border-sm" role="status" />
      </Button>
    );
  }

  if (!currentUserId || currentUserId === targetUserId) {
    return null;
  }

  return (
    <Button
      variant={isFollowing ? "outline-secondary" : "primary"}
      size={small ? "sm" : "md"}
      onClick={handleFollowToggle}
      disabled={actionLoading}
      className="d-flex align-items-center gap-1"
      style={{ minWidth: small ? "90px" : "110px" }}
    >
      {actionLoading ? (
        <span className="spinner-border spinner-border-sm" role="status" />
      ) : isFollowing ? (
        <>
          <FaUserCheck /> {small ? "" : "Siguiendo"}
        </>
      ) : (
        <>
          <FaUserPlus /> {small ? "Seguir" : "Seguir usuario"}
        </>
      )}
    </Button>
  );
};

export default FollowButton;
