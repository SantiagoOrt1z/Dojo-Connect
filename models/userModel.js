import pool from "../config/db.js";

export async function insertUser(email, passwordHashed) {
    try {
        const result = await pool.query(
            "INSERT INTO users (email, password) VALUES($1, $2) RETURNING *",
            [email, passwordHashed]
        );
        return result.rows[0];
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export async function getUserById(id){
    try{
        const result = await pool.query("SELECT * FROM users WHERE id = $1",[id])
        if(result.rows.length > 0){
            return result.rows[0]
        }else{
            return false
        }       
    }catch(err){
        console.error(err)
        throw err
    }
}

export async function getUserByEmail(email) {
    try {
        const result = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );
        if(result.rows.length > 0){
            return result.rows[0];
        }else{
            return false
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export async function deleteUserByEmail(email) {
    try {
        await pool.query("DELETE FROM users WHERE email = $1", [email]);
        return true
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export async function updateUser(id,email,passwordHashed) {
    try {
        const result = await pool.query("UPDATE users SET email = $1, password = $2 WHERE id = $3 RETURNING *", [email,passwordHashed,id]);
        const user = result.rows[0]
        return user
    } catch (err) {
        console.error(err);
        throw err;
    }
    
}
