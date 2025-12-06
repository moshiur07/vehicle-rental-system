import { Router } from "express";
import { userController } from "./user.controller";

const router = Router();


router.post("/auth/signup", userController.createUser)

router.get("/users", userController.getUsers)

router.put("/users/:id", userController.updateUser)

router.delete("/users/:id", userController.deleteUser)



export const userRoutes = router;