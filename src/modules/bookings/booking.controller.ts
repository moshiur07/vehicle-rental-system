import { Request, Response } from "express";
import { bookingServices } from "./booking.service";

const createBooking = async (req: Request, res: Response) => {
    try {
        const results: any = await bookingServices.createBooking(req.body)

        if (results == null) {
            return res.status(400).json({
                success: false,
                message: "Vehicle is already booked!",
            })
        }
        const { bookingQuery, vehicleQuery } = results;
        const bookingDetails = bookingQuery.rows[0]
        const vehicleDetails = vehicleQuery.rows[0]
        const { vehicle_name, daily_rent_price } = vehicleDetails
        const days = Math.ceil(
            (new Date(bookingDetails.rent_end_date).getTime() - new Date(bookingDetails.rent_start_date).getTime()) / (1000 * 60 * 60 * 24)
        );
        const total_price = days * vehicleDetails.daily_rent_price;
        const data = {
            ...bookingDetails, total_price, status: "active",
            vehicle: { vehicle_name, daily_rent_price }
        }
        res.status(201).json({
            success: true,
            message: "Booking created successfully",
            data: data
        })
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
            errors: err
        })
    }

}

const getBookings = async (req: Request, res: Response) => {
    try {
        const result = await bookingServices.getBookings(req);
        res.status(201).json({
            success: true,
            message: "Bookings retrieved successfully",
            data: result?.rows
        })
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
            errors: err
        })
    }

}

const updateBookings = async (req: Request, res: Response) => {
    try {
        const result = await bookingServices.updateBooking(req);
        if (result == null) {
            res.status(400).json({
                success: false,
                message: "Invalid Credentials"
            })
        }
        res.status(201).json({
            success: true,
            message: "Bookings retrieved successfully",
            data: result?.rows
        })
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
            errors: err
        })
    }

}

export const bookingController = {
    createBooking, getBookings, updateBookings
}