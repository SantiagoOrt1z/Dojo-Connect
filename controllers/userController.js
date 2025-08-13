import { createUser,updateDataUser } from "../service/userService.js";
import { deleteUser } from "../models/userModel.js";

export async function registerUser(req, res) {
    try {
        const { email, password } = req.body;
        await createUser(email, password);
        res.status(201).json({ message: "Usuario creado con éxito" });
    } catch (err) {
        res.status(500).json({
            error: "Error al crear el usuario",
            details: err.message
        });
    }
}

export async function editUser(req,res) {
    try{
        const {id, email, password} = req.body
       const result = await updateDataUser(id,email,password)
       res.status(200).json(result)
    }catch(err){
        res.status(500).json({
            error:"Error al editar el usuario",
            details: err.message
        })
    }
}

export async function deleteUser(req,res) {
    try{
        const {email} = req.body
       await deleteUser(email)
       res.status(200).json({message:"Usuario eliminado correctamente"})
    }catch(err){
        res.status(500).json({
            error:"Error al eliminar el usuario",
            details: err.message
        })
    }
}
