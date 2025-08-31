import pool from "../config/db.js"

export async function getMartialArt(name) {
    try{
    const result = await pool.query("SELECT * FROM martial_arts WHERE name = $1",[name])
        return result.rows[0]
    }catch(err){
        console.error(err)
        throw err
    }
}