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

export function editInfoUser(email, password, name, username, bio) {
  return API.put("/user/", { 
    email, 
    password: password || undefined, // Si está vacío, undefined
    name, 
    username, 
    bio 
  });}

export function login(email,password){
  return API.post("/user/login",{email,password})
}

export function logout(){
  return API.post("/user/logout")
}

export function me(){
  return API.get("/user/me")
}

export function deleteUser(){
  return API.delete("/user/")
}

export function getPosts() {
  return API.get("/post/all");
}

export function getComments(postId) {
  return API.get(`/posts/${postId}/comments`);
}

export function addComment(postId, content) {
  return API.post(`/posts/${postId}/comments`, { content });
}

export function likePost(postId) {
  return API.post(`/posts/${postId}/like`);
}

export function unlikePost(postId) {
  return API.delete(`/posts/${postId}/like`);
}

export function createPost(content) {
  return API.post("/post/add", { content });
}

export function followUser(userId) {
  return API.post(`/user/${userId}/follow`);
}

export function unfollowUser(userId) {
  return API.delete(`/user/${userId}/follow`);
}

export function checkFollowStatus(userId) {
  return API.get(`/user/${userId}/follow-status`);
}

export function getFollowers() {
  return API.get("/user/followers");
}

export function getFollowing() {
  return API.get("/user/following");
}
