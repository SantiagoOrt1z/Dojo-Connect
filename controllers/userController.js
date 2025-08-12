import { createUser } from "../service/userService.js";

export async function registerUser(req,res) {
    try{
        const {email, password} = req.body
        const result = await createUser(email, password)
        res.status(201).json({message:"Usuario creado con exito"})
    }catch(err){
        res.status(404).json({error:"Error al crear el usuairo"}, err.message)
    }
    
}