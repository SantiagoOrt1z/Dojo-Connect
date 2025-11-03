import pool from "../config/db.js";

export async function insertImage(post_id, image_url) {
  const { rows } = await pool.query(
    `INSERT INTO post_images (post_id, image_url)
     VALUES ($1, $2)
     RETURNING *;`,
    [post_id, image_url]
  );
  return rows[0];
}

export async function selectImagesByPost(post_id) {
  const { rows } = await pool.query(
    `SELECT * FROM post_images WHERE post_id = $1;`,
    [post_id]
  );
  return rows;
}
