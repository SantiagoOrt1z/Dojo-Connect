import pool from "../config/db.js";

export async function insertLike(user_id, post_id) {
  const query = `
    INSERT INTO post_likes (user_id, post_id)
    VALUES ($1, $2)
    ON CONFLICT (user_id, post_id) DO NOTHING
    RETURNING *;
  `;
  const { rows } = await pool.query(query, [user_id, post_id]);
  return rows[0];
}

export async function deleteLike(user_id, post_id) {
  const query = `DELETE FROM post_likes WHERE user_id = $1 AND post_id = $2;`;
  await pool.query(query, [user_id, post_id]);
}

export async function countLikes(post_id) {
  const { rows } = await pool.query(
    `SELECT COUNT(*) AS likes FROM post_likes WHERE post_id = $1;`,
    [post_id]
  );
  return rows[0].likes;
}
