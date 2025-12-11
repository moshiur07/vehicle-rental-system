import { Router } from "express";
import { authController } from "./auth.controller";

const router = Router();


router.post('/auth/signin', authController.userLogin)

router.post("/auth/signup", authController.createUser)


export const authRoutes = router;