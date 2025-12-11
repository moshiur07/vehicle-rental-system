import express, { Request, Response } from "express";
import initDB from "./config/db";
import { userRoutes } from "./modules/Users/user.routes";
import { vehicleRoutes } from "./modules/vehicle/vehicle.routes";
import { bookingRoutes } from "./modules/bookings/booking.routes";
import { authRoutes } from "./modules/auth/auth.routes";


// app
const app = express()

// parser
app.use(express.json())

// DB
initDB();

// user crud
app.use("/api/v1", userRoutes)

// vehicle crud
app.use("/api/v1", vehicleRoutes)

// Bookings crud
app.use("/api/v1", bookingRoutes)

// auth
app.use("/api/v1", authRoutes)

// Error
app.use((req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        message: "NO path found",
        path: req.path
    })
})
export default app;