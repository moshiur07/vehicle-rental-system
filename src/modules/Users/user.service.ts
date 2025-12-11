import { Request } from "express";
import { pool } from "../../config/db"



const getUsers = async () => {
    const result = await pool.query(`SELECT * FROM users`)
    return result;
}

const updateUser = async (req: Request) => {
    const { name, email, phone, role } = req.body;
    const user = req.user;
    const userIdFromParams = req.params.userId;

    if (user?.role == 'customer' && user?.id == userIdFromParams) {
        console.log(' hete customer');
        const result = await pool.query(`UPDATE users SET name=$1,email=$2,phone=$3 WHERE id=$4 RETURNING *`, [name, email, phone, userIdFromParams])
        delete result.rows[0].password
        return result;
    }
    else if (user?.role == 'admin') {
        const result = await pool.query(`UPDATE users SET name=$1,email=$2,phone=$3,role=$4 WHERE id=$5 RETURNING *`, [name, email, phone, role, userIdFromParams])
        delete result.rows[0].password
        return result;
    }
    return null;
}


const deleteUser = async (id: string) => {
    const result = await pool.query(`DELETE FROM users WHERE id=$1`, [id])
    return result;
}

export const userServices = {
    getUsers,
    updateUser,
    deleteUser
}