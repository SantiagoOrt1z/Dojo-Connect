import pool from "../config/db.js";

export async function insertComment(user_id, post_id, content) {
  const { rows } = await pool.query(
    `INSERT INTO comments (user_id, post_id, content)
     VALUES ($1, $2, $3)
     RETURNING *;`,
    [user_id, post_id, content]
  );
  return rows[0];
}

export async function selectCommentsByPost(post_id) {
  const { rows } = await pool.query(
    `SELECT c.*, u.email
     FROM comments c
     JOIN users u ON u.id = c.user_id
     WHERE c.post_id = $1
     ORDER BY c.created_at ASC;`,
    [post_id]
  );
  return rows;
}
