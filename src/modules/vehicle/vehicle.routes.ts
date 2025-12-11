import { Router } from "express";
import { vehicleController } from "./vehicle.controller";
import auth from "../../middleware/auth";

const router = Router();

router.post("/vehicles", auth("admin"), vehicleController.createVehicle)

router.get("/vehicles", vehicleController.getAllVehicles)

router.get("/vehicles/:vehicleId", vehicleController.singleVehicle)

router.put("/vehicles/:vehicleId", auth("admin"), vehicleController.updateVehicle)

router.delete("/vehicles/:vehicleId", auth("admin"), vehicleController.deleteVehicle)

export const vehicleRoutes = router;