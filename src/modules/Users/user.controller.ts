import { Request, Response } from "express";
import { userServices } from "./user.service";



const getUsers = async (req: Request, res: Response) => {
    try {
        const result = await userServices.getUsers()
        res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
            data: result.rows
        })

    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
            errors: err
        })
    }
}

const updateUser = async (req: Request, res: Response) => {
    try {
        const result: any = await userServices.updateUser(req)
        if (result.rowCount! > 0) {
            res.status(200).json({
                success: true,
                message: "Users updated successfully",
                data: result.rows[0]
            })
        }
        else if (result == null) {
            res.status(403).json({
                success: false,
                message: "You are not allowed"
            })
        }
        else {
            res.status(404).json({
                success: false,
                message: "User does not exist"
            })
        }
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
            errors: err
        })
    }
}

const deleteUser = async (req: Request, res: Response) => {
    try {
        const result = await userServices.deleteUser(req.params.userId!)
        if (result.rowCount! > 0) {
            res.status(200).json({
                success: true,
                message: "Users deleted successfully"
            })
        } else {
            res.status(404).json({
                success: false,
                message: "User does not exist"
            })
        }
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
            errors: err
        })
    }
}


export const userController = {
    getUsers,
    updateUser,
    deleteUser
}