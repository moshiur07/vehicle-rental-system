import { pool } from "../../config/db"

const createVehicle = async (payload: Record<string, unknown>) => {
    const { vehicle_name, type, registration_number, daily_rent_price, availability_status } = payload;
    const result = await pool.query(`
        INSERT INTO vehicles( vehicle_name, type, registration_number, daily_rent_price, availability_status ) VALUES($1,$2,$3,$4,$5) RETURNING *
        `, [vehicle_name, type, registration_number, daily_rent_price, availability_status])
    return result;
}

const getAllVehicles = async () => {
    const result = await pool.query(`SELECT * FROM vehicles`)
    return result;
}

const singleVehicle = async (id: string) => {
    const result = await pool.query(`SELECT * FROM vehicles WHERE id=$1`, [id])
    return result;
}
const updateVehicle = async (payload: Record<string, unknown>, id: string) => {
    const { vehicle_name, type, registration_number, daily_rent_price, availability_status } = payload;
    const result = await pool.query(`UPDATE vehicles SET vehicle_name=$1,type=$2,registration_number=$3,daily_rent_price=$4, availability_status=$5 WHERE id=$6 RETURNING *`, [vehicle_name, type, registration_number, daily_rent_price, availability_status, id])
    return result
}

const deleteVehicle = async (id: string) => {
    const vehicleQuery = await pool.query(`SELECT * FROM vehicles`)
    const allVehicles = vehicleQuery.rows
    const vehicle = await allVehicles.find((vehicle) => vehicle.id == id)
    const bookings = await pool.query(`SELECT * FROM bookings WHERE vehicle_id = $1 `, [vehicle.id])
    const bookingStatus = bookings.rows[0].status
    if (bookingStatus != 'active') {
        if (vehicle.availability_status == 'available') {
            const result = await pool.query(`DELETE FROM vehicles WHERE id=$1`, [id])
            return result;
        }
    }
    return null;
}


export const vehicleServices = {
    createVehicle,
    getAllVehicles,
    singleVehicle,
    updateVehicle,
    deleteVehicle
}