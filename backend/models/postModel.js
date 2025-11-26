import pool from "../config/db.js";

export async function insertPost(content, userId) {
    try{
        const result = await pool.query("INSERT INTO posts (content, user_id) VALUES($1,$2) RETURNING *", [content,userId])
        return result.rows[0]
    }catch(err){
        console.error(err)
        throw err;
    }
}

export async function getAllPosts() {
    try{
        const query = `
            SELECT 
                p.*,
                u.name as user_name,
                u.username,
                u.avatar_url,
                (SELECT COUNT(*) FROM post_likes WHERE post_id = p.id) as likes_count,
                (SELECT COUNT(*) FROM comments WHERE post_id = p.id) as comments_count,
                (SELECT image_url FROM post_images WHERE post_id = p.id LIMIT 1) as post_image
            FROM posts p 
            JOIN users u ON p.user_id = u.id 
            ORDER BY p.created_at DESC
        `;
        const result = await pool.query(query);
        return result.rows;
    } catch(err){
        console.error(err);
        throw err;
    }
}

export async function getPostById(id) {
    try{
        const result = await pool.query("SELECT * FROM posts WHERE id = $1",[id])
        return result.rows[0]
    }catch(err){
        console.error(err)
        throw err
    }
}

export async function getUserPosts(userId) {
    try{
        const result = await pool.query("SELECT * FROM posts WHERE user_id = $1", [userId])
        return result.rows
    }catch(err){
        console.error(err)
        throw err
    }
}

export async function updatePost(id, content) {
    try{
        const result = await pool.query("UPDATE posts SET content = $1 WHERE id = $2 RETURNING *" , [content, id])
        return result.rows[0]
    }catch(err){
        console.error(err)
        throw err
    }
}

export async function deletePostById(id) {
    try{
        await pool.query("DELETE FROM posts WHERE id = $1", [id])
    }catch(err){
        console.error(err)
        throw err
    }
}