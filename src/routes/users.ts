import { Router, Request, Response } from "express"
import { User } from "../models/User"
import fs from "fs"

const router = Router()
const USERS_FILE = "./src/data/users.json"

// lee usuarios desde el archivo
const readUsers = (): User[] => {
    if (!fs.existsSync(USERS_FILE)) return []
    const data = fs.readFileSync(USERS_FILE, "utf-8")
    return JSON.parse(data || "[]")
}

// escribe usuarios en el archivo
const writeUsers = (users: User[]) => {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 4))
}

// valida que todos los datos se ingresen
const validateUser = (user: Partial<User>): string[] => {
    const errors: string[] = []
    if (!user.id) errors.push("ID is required")
    if (!user.name) errors.push("Name is required")
    if (!user.lastname) errors.push("Lastname is required")
    if (!user.email) errors.push("Email is required")
    return errors
}

// devuelve todos los usuarios
router.get("/", (req: Request, res: Response) => {
    const users = readUsers()
    res.json(users)
})

// agrega un nuevo usuario
router.post("/", (req: Request, res: Response) => {
    const users = readUsers()
    const newUser: User = req.body

    const errors = validateUser(newUser)
    if (errors.length > 0) {
        return res.status(400).json({ message: "Invalid user data", errors })
    }

    if (users.some(user => user.id === newUser.id)) {
        return res.status(400).json({ message: "User ID already exists" })
    }

    users.push(newUser)
    writeUsers(users)
    res.status(201).json(newUser)
})

// actualiza un usuario que ya existe en el archivo
router.put("/:id", (req: Request, res: Response) => {
    const users = readUsers()
    const userId = parseInt(req.params.id)
    const updatedUser: Partial<User> = req.body

    // valida datos sin incluir el id
    if (!updatedUser.name || !updatedUser.lastname || !updatedUser.email) { 
        return res.status(400).json({ message: "Invalid user data" })
    }

    const index = users.findIndex(user => user.id === userId)
    if (index === -1) {
        return res.status(404).json({ message: "User not found" })
    }

    users[index] = { ...users[index], ...updatedUser }
    writeUsers(users)
    res.json(users[index])
})

// elimina un usuario
router.delete("/:id", (req: Request, res: Response) => {
    const users = readUsers()
    const userId = parseInt(req.params.id)

    const newUsers = users.filter(user => user.id !== userId)
    if (newUsers.length === users.length) {
        return res.status(404).json({ message: "User not found" })
    }

    writeUsers(newUsers)
    res.json({ message: `User with ID ${userId} deleted` })
})

export default router
