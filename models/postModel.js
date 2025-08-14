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
        const result = await pool.query("SELECT * from posts")
        return result.rows
    }catch(err){
        console.error(err)
        throw err
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