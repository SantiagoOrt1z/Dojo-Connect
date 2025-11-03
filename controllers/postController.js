import { insertPost, getAllPosts, getPostById, getUserPosts,updatePost, deletePostById } from "../models/postModel.js";

export async function addPost(req,res) {
    try{
        const userID = req.session.user.id
        const {content} = req.body  

        const result = await insertPost(content, userID)
        res.status(201).json(result)
    }catch(err){
        res.status(500).json({message:"Error al postear", error:err.message})
    }
}

export async function allPost(req,res) {
     try{
        const result = await getAllPosts()
        res.status(200).json(result)
    }catch(err){
        res.status(500).json({message:"Error al cargar los posts", error:err.message})
    }
}

export async function postId(req,res) {
    try{
        const id = req.params.id
        const result = await getPostById(id)
        res.status(200).json(result)
    }catch(err){
        res.status(500).json({message:"Error al cargar el post", error:err.message})
    }
}

export async function userPosts(req,res) {
    try{
        const userId = req.session.user.id
        const result = await getUserPosts(userId)
        res.status(200).json(result)
    }catch(err){
        res.status(500).json({message:"Error al cargar los posts", error:err.message})
    }
}

export async function editPost(req,res) {
    try{
        const id = req.params.id
        const content = req.body.content
        const result = await updatePost(id, content)
        res.status(200).json(result)
    }catch(err){
        res.status(500).json({message:"Error al editar el post", error:err.message})
    }
}

export async function deletePost(req,res) {
    try{
        const id = req.params.id
        const result = await deletePostById(id)
        res.status(200).json({message:"El post se elimino exitosamente"})
    }catch(err){
        res.status(500).json({message:"Error al cargar los posts", error:err.message})
    }
}