import { Router } from "express";
import controller from "./controller.js";

const router = Router();

router.get("/",controller.getHopDong);

router.post("/MaHD",controller.getHopDongByID);

router.post("/",controller.insertHopDong);

router.put("/",controller.updateHopDong);

router.delete("/",controller.deleteHopDong);

export default router;