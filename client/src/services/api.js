import axios from "axios"

const API = axios.create({
    baseURL:"https://localhost:3000",
    withCredentials:true,
      headers: {
    "Content-Type": "application/json",
  },
})

export  function register(email, password) {
  return API.post("/user/register", {email,password})
}

export function login(email,password){
  return API.post("/user/login",{email,password})
}