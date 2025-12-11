import { Request, Response } from "express"
import { vehicleServices } from "./vehicle.service"

const createVehicle = async (req: Request, res: Response) => {
    try {
        const result = await vehicleServices.createVehicle(req.body)
        res.status(201).json({
            success: true,
            message: "Vehicle created successfully",
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

const singleVehicle = async (req: Request, res: Response) => {
    try {
        const result = await vehicleServices.singleVehicle(req.params.vehicleId as string)
        res.status(201).json({
            success: true,
            message: "Vehicle retrieved successfully",
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
const getAllVehicles = async (req: Request, res: Response) => {
    try {
        const result = await vehicleServices.getAllVehicles()
        res.status(201).json({
            success: true,
            message: "Vehicles retrieved successfully",
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

const updateVehicle = async (req: Request, res: Response) => {
    try {
        const result = await vehicleServices.updateVehicle(req.body, req.params.vehicleId!)
        if (result.rowCount! > 0) {
            const { ...data } = req.body
            res.status(200).json({
                success: true,
                message: "Users updated successfully",
                data: data
            })
        } else {
            res.status(404).json({
                success: false,
                message: "Vehicle does not exist"
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

const deleteVehicle = async (req: Request, res: Response) => {
    try {
        const result = await vehicleServices.deleteVehicle(req.params.vehicleId!)
        if (result?.rowCount! > 0) {
            res.status(200).json({
                success: true,
                message: "Vehicle deleted successfully"
            })
        } else {
            res.status(404).json({
                success: false,
                message: "Vehicle is active"
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


export const vehicleController = {
    createVehicle,
    getAllVehicles,
    singleVehicle,
    updateVehicle,
    deleteVehicle
}