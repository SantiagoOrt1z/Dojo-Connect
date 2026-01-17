import { createUser,updateDataUser, userCompare } from "../service/userService.js";
import { deleteUserByEmail, getUserByEmail, getUserById } from "../models/userModel.js";

export async function registerUser(req, res) {
    try {
        const { email, password, name, username, bio } = req.body;

        const checkResult = await getUserByEmail(email)

        if(checkResult != false){
            res.status(500).json({message: "El usuario ya existe"})
        }else{
        await createUser(email, password,name, username, bio);
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
 
        const id = req.session.user.id;
        const { email, password, name, username, bio } = req.body;
        

        
        const result = await updateDataUser(id, email, password, name, username, bio);


        req.session.user = {
            ...req.session.user,
            name: result.name,
            username: result.username,
            bio: result.bio,
            email: result.email
        };
        
  
        
        res.status(200).json(result);
    } catch(err) {
        console.error("Error en editUser:", err);
        res.status(500).json({ error: "Error al editar usuario" });
    }
}

export async function deleteUser(req,res) {
    try{
        const id= req.session.user
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
        console.log("=== DEBUG loginUser ===");
        console.log("Email recibido:", req.body.email);
        
        const {email, password} = req.body;
        
        if (!email || !password) {
            console.log("❌ Faltan credenciales");
            return res.status(400).json({message: "Email y password requeridos"});
        }
        
        const result = await userCompare(email, password);
        console.log("Resultado userCompare:", result);
        
        if(result){
            const user = await getUserByEmail(email);
            console.log("Usuario encontrado:", user?.id, user?.email);
            
            req.session.user = user;
            
            // Guardar sesión explícitamente
            req.session.save((err) => {
                if (err) console.error("Error guardando sesión:", err);
            });
            
            console.log("✅ Login exitoso. Session ID:", req.sessionID);
            res.status(200).json({message: "Inicio de sesion exitoso"});
            
        } else {
            console.log("❌ Credenciales incorrectas");
            res.status(401).json({message: "Credenciales incorrectas"}); // ← 401, no 500
        }
        
    } catch(err) {
        console.error("❌ ERROR en loginUser:", err);
        res.status(500).json({message: "Error en el servidor", error: err.message});
    }
}

export function getSessionUser(req, res) {
  console.log("Session en getSessionUser:", req.session);
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
