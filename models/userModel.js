import {pool} from "../config/db.js"

export async function insertUser(email, passwordHashed) {
    try{
        await pool.query("INSERT INTO users (email,password) VALUES($1,$2)", [email, passwordHashed])
    }
    catch(err){
        console.error(err)
    }
}

