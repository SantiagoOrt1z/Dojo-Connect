import { createUser } from "../service/userService.js";

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
