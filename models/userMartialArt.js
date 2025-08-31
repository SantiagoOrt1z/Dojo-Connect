import pool from "../config/db.js"

export async function insertUSerMartialArt(userId,martialArtId,belt,exp) {
    try{
        const result = await pool.query("INSERT TO user_martial_arts (user_id, martial_art_id,belt,exp) VALUES ($1,$2,$3,$4) RETURNING *", [userId,martialArtId,belt,exp])
        return result.rows[0]
    }catch(err){
        console.error(err)
        throw err
    } 
}

export async function getUserMartialArts(userId) {
    try{
        const result = await pool.query("SELECT * FROM user_martial_arts WHERE user_id = $1",[userId])
        return result.rows
    }catch(err){
        console.error(err)
        throw err
    }
}

export async function updateUserMartialArt(userId, martialArtId, belt, exp) {
    try{
        const result = await pool.query("UPDATE user_martial_arts SET belt = $1, exp = $2 WHERE user_id = $3, martial_art_id = $4 RETURNING *",[belt,exp,userId,martialArtId])
        return result.rows[0]
    }
    catch(err){
        console.error(err)
        throw err
    }
}

export async function deleteUserMartialArtById(userId, martialArtId) {
    try{

    }catch(err){
        console.error(err)
        throw err
    }
}