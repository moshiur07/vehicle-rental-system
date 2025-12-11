import { Request, Response } from "express";
import { authService } from "./auth.service";


const userLogin = async (req: Request, res: Response) => {
    try {
        const result = await authService.userLogin(req.body.email, req.body.password)

        if (result == null) {
            res.status(404).json({
                success: false,
                message: "User does not exist"
            })
        }
        else if (result == false) {
            res.status(403).json({
                success: false,
                message: "Invalid Credentials"
            })
        }
        else {
            res.status(201).json({
                success: true,
                message: "User found successfully",
                data: result
            })
        }


    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
        })
    }
}

const createUser = async (req: Request, res: Response) => {
    try {
        const result = await authService.createUser(req.body)
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: result.rows[0]
        })

    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
            errors: err
        })
    }
}



export const authController = {
    userLogin,
    createUser
}