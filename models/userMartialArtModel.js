import pool from "../config/db.js"

export async function insertUSerMartialArt(userId,martialArtId,belt,exp) {
    try{
        const result = await pool.query("INSERT INTO user_martial_arts (user_id, martial_art_id,belt,exp) VALUES ($1,$2,$3,$4) RETURNING *", [userId,martialArtId,belt,exp])
        return result.rows[0]
    }catch(err){
        console.error(err)
        throw err
    } 
}

export async function getUserMartialArts(userId) {
    try{
        const result = await pool.query("SELECT * FROM user_martial_arts WHERE user_id = $1",[userId])
        if(result.rows.length > 0){
            return result.rows
        }else{
            return false
        }
    }catch(err){
        console.error(err)
        throw err
    }
}

export async function updateUserMartialArt(userId, martialArtId, belt, exp) {
    try {
        const result = await pool.query(
            `UPDATE user_martial_arts
             SET belt = $1, exp = $2
             WHERE user_id = $3 AND martial_art_id = $4
             RETURNING *`,
            [belt, exp, userId, martialArtId]
        );
        return result.rows[0];
    } catch (err) {
        console.error(err);
        throw err;
    }
}


export async function deleteUserMartialArtById(userId, martialArtId) {
    try{
        await pool.query("DELETE FROM user_martial_arts WHERE user_id = $1 AND martial_art_id = $2",[userId,martialArtId])
        return true
    }catch(err){
        console.error(err)
        throw err
    }
}