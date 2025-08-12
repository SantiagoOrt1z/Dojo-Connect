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

export async function getAllUsers() {
    try {
        const result = await pool.query("SELECT * FROM users");
        return result.rows;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export async function getUser(email) {
    try {
        const result = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );
        return result.rows[0];
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export async function deleteUser(email) {
    try {
        await pool.query("DELETE FROM users WHERE email = $1", [email]);
    } catch (err) {
        console.error(err);
        throw err;
    }
}
