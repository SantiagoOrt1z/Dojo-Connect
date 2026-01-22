import pool from "../config/db.js";

export async function followUser(followerId, followedId) {
  const query = `
    INSERT INTO user_follows (follower_id, followed_id)
    VALUES ($1, $2)
    ON CONFLICT (follower_id, followed_id) DO NOTHING
    RETURNING *;
  `;
  const result = await pool.query(query, [followerId, followedId]);
  return result.rows[0];
}

export async function unfollowUser(followerId, followedId) {
  const query = `
    DELETE FROM user_follows
    WHERE follower_id = $1 AND followed_id = $2
    RETURNING *;
  `;
  const result = await pool.query(query, [followerId, followedId]);
  return result.rows[0];
}

export async function getFollowers(userId) {
  const query = `
    SELECT u.id, u.email
    FROM user_follows f
    JOIN users u ON f.follower_id = u.id
    WHERE f.followed_id = $1;
  `;
  const result = await pool.query(query, [userId]);
  return result.rows;
}

export async function getFollowing(userId) {
  const query = `
    SELECT u.id, u.email
    FROM user_follows f
    JOIN users u ON f.followed_id = u.id
    WHERE f.follower_id = $1;
  `;
  const result = await pool.query(query, [userId]);
  return result.rows;
}

export async function checkIfFollowing(followerId, followedId) {
  const query = `
    SELECT 1 FROM user_follows 
    WHERE follower_id = $1 AND followed_id = $2
    LIMIT 1;
  `;
  const result = await pool.query(query, [followerId, followedId]);
  return result.rows.length > 0;
}