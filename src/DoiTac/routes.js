import { Router } from "express";
import controller from "./controller.js";

const router = Router();

router.get("/", controller.getDoiTac);

router.get("/MaDT", controller.getDoiTacWithMaDT);

router.get("/getAvailableDoiTac", controller.getAvailableDoiTac);

router.post("/", controller.insertDoiTac);

router.put("/", controller.updateDoiTac);

router.delete("/", controller.deleteDoiTac);

export default router;
