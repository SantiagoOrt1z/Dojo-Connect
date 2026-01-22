import {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
} from "../models/userFollowModel.js";

export async function follow(req, res) {
  try {
    const followerId = req.session.user.id
    const followedId  = req.params.userId;
    const result = await followUser(followerId, followedId);
    res.json(result || { message: "Ya lo sigues o no se pudo seguir" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al seguir usuario" });
  }
}

export async function unfollow(req, res) {
  try {
    const followerId = req.session.user.id
    const  followedId  = req.params.userId
    const result = await unfollowUser(followerId, followedId);
    res.json(result || { message: "No se seguían o no se pudo dejar de seguir" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al dejar de seguir" });
  }
}

export async function followers(req, res) {
  try {
    const  userId = req.session.user.id;
    const result = await getFollowers(userId);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener seguidores" });
  }
}

export async function following(req, res) {
  try {
    const userId = req.session.user.id;
    const result = await getFollowing(userId);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener seguidos" });
  }
}
