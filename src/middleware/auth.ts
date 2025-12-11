import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../config";

const auth = (...roles: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(500).json({ message: "You are not allowed" })
        }
        const decode = jwt.verify(token, config.jwt_secret!) as JwtPayload

        req.user = decode;
        if (roles.length && !roles.includes(decode.role as string)) {
            return res.status(500).json({ message: "You are Unauthorized " })
        }
        console.log(`authenticated ${roles[0]}`);
        next();
    }
}

export default auth;