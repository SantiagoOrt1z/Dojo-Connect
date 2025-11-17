import { createUser,updateDataUser, userCompare } from "../service/userService.js";
import { deleteUserByEmail, getUserByEmail, getUserById } from "../models/userModel.js";

export async function registerUser(req, res) {
    try {
        const { email, password } = req.body;

        const checkResult = await getUserByEmail(email)

        if(checkResult != false){
            res.status(500).json({message: "El usuario ya existe"})
        }else{
        await createUser(email, password);
        res.status(201).json({ message: "Usuario creado con éxito" });}
    } catch (err) {
        res.status(500).json({
            error: "Error al crear el usuario",
            details: err.message
        });
    }
}

export async function editUser(req,res) {
    try{
        const id = req.params.id
        const { email, password} = req.body
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
        const {id}= req.params
        const user = await getUserById(id)
       await deleteUserByEmail(user.email)
       res.status(200).json({message:"Usuario eliminado correctamente"})
    }catch(err){
        res.status(500).json({
            error:"Error al eliminar el usuario",
            details: err.message
        })
    }
}

export async function loginUser(req,res) {
    try{
        const {email, password} = req.body
        const result = await userCompare(email, password)
        if(result){
            const user = await getUserByEmail(email)
            req.session.user = user
            res.status(200).json({message: "Inicio de sesion exitoso"})
        }else{
            res.status(500).json({message: "Error al iniciar sesion"})
        }
    }catch(err){
        console.error(err)
        throw err
    }
}

export function getSessionUser(req, res) {
  if (req.session.user) {
    return res.status(200).json(req.session.user);
  }
  return res.status(401).json({ message: "No hay sesión activa" });
}

export function logoutUser(req, res) {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.status(200).json({ message: "Sesión cerrada" });
  });
}
