import { Router } from "express";
import controller from "./controller.js";

const router = Router();

router.get("/",controller.getPhiHoaHong);

router.get("/MaDT",controller.getPhiHoaHongByID);

// router.post("/",controller.insertPhiHoaHong);

router.put("/",controller.updatePhiHoaHong);

// router.delete("/",controller.deletePhiHoaHong);

export default router;