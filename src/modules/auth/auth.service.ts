import { pool } from "../../config/db"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import { config } from "../../config";

const userLogin = async (email: string, password: string) => {

    const result = await pool.query(`
        SELECT * FROM users WHERE email=$1
        `, [email])
    if (result.rows.length === 0) return null;

    const user = result.rows[0]
    const matchPass = await bcrypt.compare(password, user.password)
    if (!matchPass) return false

    const jwtPayload = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    }
    const token = jwt.sign(jwtPayload, config.jwt_secret!, { expiresIn: "7d" })

    delete user.password;

    return { token, user }
}

const createUser = async (payload: Record<string, unknown>) => {
    const { name, email, password, phone, role } = payload;
    const hashedPass = await bcrypt.hash(password as string, 10)
    const result = await pool.query(`INSERT INTO users(name, email, password, phone, role) VALUES( $1, $2, $3, $4, $5) RETURNING *`, [name, email, hashedPass, phone, role])
    delete result.rows[0].password
    return result;
}


export const authService = {
    userLogin, createUser
}