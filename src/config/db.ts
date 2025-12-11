import { Pool } from "pg"
import { config } from "."

export const pool = new Pool({
  connectionString: `${config.connection_str}`
})

const initDB = async () => {
  // ! users
  await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(200) NOT NULL,
        email VARCHAR(200) UNIQUE NOT NULL CHECK (email = lower(email)),
        password TEXT NOT NULL CHECK (length(password) >= 6),
        phone INT NOT NULL,
        role TEXT NOT NULL DEFAULT 'customer' CHECK (role IN ('customer', 'admin'))
          )
        `)
  // ! vehicles
  await pool.query(`
        CREATE TABLE IF NOT EXISTS vehicles(
        id SERIAL PRIMARY KEY,
        vehicle_name VARCHAR(200) NOT NULL,
        type TEXT NOT NULL CHECK(type IN ('car','bike','van','SUV')),
        registration_number VARCHAR(300) UNIQUE NOT NULL ,
        daily_rent_price INT NOT NULL CHECK(daily_rent_price > 0),
        availability_status TEXT NOT NULL CHECK(availability_status IN ('available', 'booked'))
          )
        `)
  // ! bookings
  await pool.query(`
            CREATE TABLE IF NOT EXISTS bookings(
            id SERIAL PRIMARY KEY,
            customer_id INT REFERENCES users(id) ON DELETE CASCADE,
            vehicle_id INT REFERENCES vehicles(id) ON DELETE CASCADE,
            rent_start_date DATE NOT NULL,
            rent_end_date DATE NOT NULL CHECK( rent_end_date > rent_start_date ),
            total_price INT CHECK (total_price > 0),
            status TEXT DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'returned'))
             )
            `)
  console.log("DB ping.....");
}


export default initDB;