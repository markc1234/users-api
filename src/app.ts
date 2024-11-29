import express from "express"
import userRoutes from "./routes/users"

const app = express()
const PORT = 3000

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/users", userRoutes)
app.get("/", (req, res) => res.send("USERS-API"))

app.listen(PORT, () => {
    console.log(`Servidor ejecutando en http://localhost:${PORT}`)
}) 