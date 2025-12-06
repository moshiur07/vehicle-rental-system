import { pool } from "../../config/db"
import bcrypt from "bcryptjs";

const createUser = async (payload: Record<string, unknown>) => {
    const { name, email, password, phone, role } = payload;
    const hashedPass = await bcrypt.hash(password as string, 10)

    const result = await pool.query(`INSERT INTO users(name, email, password, phone, role) VALUES( $1, $2, $3, $4, $5) RETURNING *`, [name, email, hashedPass, phone, role])
    return result;
}

const getUsers = async () => {
    const result = await pool.query(`SELECT * FROM users`)
    return result;
}


const updateUser = async (payload: Record<string, unknown>, id: string) => {
    const { name, email, phone, role } = payload
    const result = await pool.query(`UPDATE users SET name=$1,email=$2,phone=$3,role=$4 WHERE id=$5 RETURNING *`, [name, email, phone, role, id])
    return result
}


const deleteUser = async (id: string) => {
    const result = await pool.query(`DELETE FROM users WHERE id=$1`, [id])
    return result;
}

export const userServices = {
    createUser,
    getUsers,
    updateUser,
    deleteUser
}