import { insertLike, deleteLike, countLikes } from "../models/postLikeModel.js";
import { insertComment, selectCommentsByPost } from "../models/commentModel.js";
import { insertImage, selectImagesByPost } from "../models/postImageModel.js";


export async function likePost(req, res) {
  try {
    const user_id = req.session.user.id;
    const { id: post_id } = req.params;
    await insertLike(user_id, post_id);
    const likes = await countLikes(post_id);
    res.json({ success: true, likes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al dar like" });
  }
}

export async function unlikePost(req, res) {
  try {
    const user_id = req.session.user.id;
    const { id: post_id } = req.params;
    await deleteLike(user_id, post_id);
    const likes = await countLikes(post_id);
    res.json({ success: true, likes });
  } catch (err) {
    res.status(500).json({ error: "Error al quitar like" });
  }
}

export async function addComment(req, res) {
  try {
    const user_id = req.session.user.id;
    const { content } = req.body;
    const { id: post_id } = req.params;
    const comment = await insertComment(user_id, post_id, content);
    res.json(comment);
  } catch (err) {
    res.status(500).json({ error: "Error al agregar comentario" });
  }
}

export async function getComments(req, res) {
  try {
    const { id: post_id } = req.params;
    const comments = await selectCommentsByPost(post_id);
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener comentarios" });
  }
}

export async function addImage(req, res) {
  try {
    const { id: post_id } = req.params;
    const image_url = req.file.path; 
    const image = await insertImage(post_id, image_url);
    res.json(image);
  } catch (err) {
    res.status(500).json({ error: "Error al subir imagen" });
  }
}

export async function getImages(req, res) {
  try {
    const { id: post_id } = req.params;
    const images = await selectImagesByPost(post_id);
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener imágenes" });
  }
}
