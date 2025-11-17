import bcrypt from "bcrypt"
import { insertUser, updateUser, getUserById, getUserByEmail } from "../models/userModel.js"

export async function createUser(email, password) {
    try{
        const passwordHashed = await bcrypt.hash(password, 10)
        return insertUser(email, passwordHashed)
    }catch(err){
        console.error(err)
    }   
}

export async function updateDataUser(id,email, password) {
    try {
        const currentUser = await getUserById(id);

        let newEmail = email || currentUser.email;
        let newPassword = currentUser.password; 

        if (password) {
            const isSamePassword = await bcrypt.compare(password, currentUser.password);
            if (!isSamePassword) {
                newPassword = await bcrypt.hash(password, 10);
            }
        }

        return await updateUser(id, newEmail, newPassword);
    } catch (err) {
        console.error(err);
        throw err;
    }
}
export async function userCompare(email,password) {
    try{
        const user = await getUserByEmail(email)
        if(user){
            const match = await bcrypt.compare(password, user.password)
            if(!match){
                return false
            }else{
                return true
            }
        }else{
            return false
        }
    }catch(err){
        console.error(err)
    }
}