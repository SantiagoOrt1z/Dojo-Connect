import axios from "axios"

const API = axios.create({
    baseURL:"http://localhost:3000",
    withCredentials:true,
      headers: {
    "Content-Type": "application/json",
  },
})

    //USER

export  function register(email, password, name, username,bio) {
  return API.post("/user/register", {email,password,name,username,bio})
}

export function login(email,password){
  return API.post("/user/login",{email,password})
}

export function logout(){
  return API.post("/user/logout")
}

export function me(){
  return API.get("/user/me")
}

export function editInfoUser(email,password){
  return API.put("/user/",{email,password})
}

export function deleteUser(){
  return API.delete("/user/")
}

export function getPosts() {
  return API.get("/post/all");
}

export async function getComments(postId) {
  return API.get(`/posts/${postId}/comments`);
}

export async function addComment(postId, content) {
  return API.post(`/posts/${postId}/comments`, { content });
}