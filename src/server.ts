import express, { Request, Response } from "express";
import { config } from "./config";
import initDB from "./config/db";
import { userRoutes } from "./modules/Users/user.routes";

const app = express()

app.use(express.json())

initDB();

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})

app.use("/api/v1", userRoutes)

// Error
app.use((req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        message: "NO path found",
        path: req.path
    })
})


app.listen(config.port, () => {
    console.log(`Example app listening on port ${config.port}`)
})
