import { Request, Response } from "express";
import { userServices } from "./user.service";

const createUser = async (req: Request, res: Response) => {
    try {
        const result = await userServices.createUser(req.body)
        const user = result.rows[0]
        const { password, created_at, updated_at, __v, ...data } = user
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: data
        })

    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

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
            message: err.message
        })
    }
}

const updateUser = async (req: Request, res: Response) => {
    try {
        const result = await userServices.updateUser(req.body, req.params.id!)
        if (result.rowCount! > 0) {
            const { id, name, email, phone, role } = req.body
            res.status(200).json({
                success: true,
                message: "Users updated successfully",
                data: { id, name, email, phone, role }
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
            message: err.message
        })
    }
}

const deleteUser = async (req: Request, res: Response) => {
    try {
        const result = await userServices.deleteUser(req.params.id!)
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
            message: err.message
        })
    }
}


export const userController = {
    createUser,
    getUsers,
    updateUser,
    deleteUser
}