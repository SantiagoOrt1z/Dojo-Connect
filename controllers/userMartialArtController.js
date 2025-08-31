import {insertUSerMartialArt,getUserMartialArts,deleteUserMartialArtById,updateUserMartialArt} from "../models/userMartialArtModel.js"
import { getMartialArt } from "../models/martialArtsModel.js"

export async function addUserMartialArt(req, res) {
    try{
        const  userId  = req.session.user.id
        const {belt, exp, martialArt} = req.body
        const martialArtCheck = await getMartialArt(martialArt)

        const result = await insertUSerMartialArt(userId, martialArtCheck.id, belt, exp)

        res.status(201).json(result)
    }catch(err){
        res.status(500).json({
            error: "Error al agregar arte marcial",
            details: err.message
        });
    }
}

export async function getAllUserMartialArts(req,res) {
    try{
          const userId = req.session.user.id

    const result = await getUserMartialArts(userId) 
        if(result == false){
            res.status(500).json({error:"El usuario no realiza ningun arte marcial"})
        }else{
            res.status(200).json(result)
        }
    }catch(err){
        res.status(500).json({
            error: "Error al buscar artes marciales",
            details: err.message
        });
    }
  
}

export async function editUserMartialArt(req,res) {
        try{
        const  userId  = req.session.user.id
        const {belt, exp, martialArt} = req.body
        const martialArtCheck = await getMartialArt(martialArt)

        const result = await updateUserMartialArt(userId, martialArtCheck.id, belt, exp)

        res.status(201).json(result)
    }catch(err){
        res.status(500).json({
            error: "Error al editar arte marcial",
            details: err.message
        });
    }
}

export async function deleteUserMartialArt(req,res) {
    try{
        const userId = req.session.user.id
        const {martialArt} = req.body

        const martialArtCheck = await getMartialArt(martialArt)

        const result = await deleteUserMartialArtById(userId, martialArtCheck.id)

        if(result){
            res.status(200).json({message:"Arte marcial eliminada correctamente"})
        }else{
            res.status(500).json({error:"Error al eliminar arte marcial"})
        }
    }catch(err){
        res.status(500).json({
            error: "Error al eliminar arte marcial",
            details: err.message
        });
    }
}