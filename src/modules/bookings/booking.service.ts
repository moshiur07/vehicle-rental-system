import { Request } from "express";
import { pool } from "../../config/db"

const createBooking = async (payload: Record<string, unknown>) => {
    const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;
    const vehicleQuery = await pool.query(`SELECT * FROM vehicles WHERE id=$1 `, [vehicle_id])
    if (vehicleQuery.rows[0].availability_status != "booked") {
        const bookingQuery = await pool.query(`INSERT INTO bookings(customer_id, vehicle_id, rent_start_date, rent_end_date)
         VALUES($1,$2,$3,$4) RETURNING id,customer_id, vehicle_id, rent_start_date, rent_end_date`,
            [customer_id, vehicle_id, rent_start_date, rent_end_date])
        const statusUpdate = await pool.query(`UPDATE vehicles SET availability_status=$1 WHERE id=$2 RETURNING availability_status `, ["booked", vehicle_id])
        return { bookingQuery, vehicleQuery }
    }
    return null;
}

const getBookings = async (req: Request) => {
    const user = req?.user;
    const userId = req.user?.id;
    if (user?.role == 'customer') {
        const result = await pool.query(`
        SELECT * FROM bookings WHERE customer_id=$1
        `, [userId]);
        return result;
    }
    else if (user?.role == 'admin') {
        const result = await pool.query(`
         SELECT * FROM bookings
        `)
        return result;
    }
}

const updateBooking = async (req: Request) => {
    const { status } = req.body;
    const bookingId = req.params.bookingId
    const user = req?.user
    if (user?.role == 'admin' && status == 'returned') {
        const result = await pool.query(`UPDATE bookings SET status=$1 WHERE id=$2 RETURNING *`, [status, bookingId])
        return result
    }
    else if (user?.role == 'customer' && status == 'cancelled') {
        const result = await pool.query(`UPDATE bookings SET status=$1 WHERE id=$2 RETURNING *`, [status, bookingId])
        return result
    }
    return null
}


export const bookingServices = {
    createBooking,
    getBookings,
    updateBooking
}