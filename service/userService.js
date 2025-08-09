import bcrypt from "bcrypt"
import { insertUser } from "../models/userModel"

export async function createUser(email, password) {
    try{
        const passwordHashed = await bcrypt.hash(password, 10)
        return insertUser(email, passwordHashed)
    }catch(err){
        console.error(err)
    }
    
}