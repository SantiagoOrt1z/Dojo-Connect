import {Pool} from "pg"

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
})

pool.connect().then(()=>{
    console.log("Conexion satisfactoria a la base de datos")
}).catch((err)=>{
    console.log("Error al conectar la base de datos", err)
})

export default pool