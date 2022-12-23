import { Router } from "express";
import controller from "./controller.js";

const router = Router();

router.get("/", controller.getChiTietHopDong);

router.get("/MaHD", controller.getChiTietHopDongByMaHD);

router.get("/MaSoThue", controller.getChiTietHopDongByMaSoThue);

router.get("/MaDT", controller.getChiTietHopDongByMaDT);

router.post("/", controller.insertChiTietHopDong);

// router.put("/",controller.updateHopDong);

// router.delete("/",controller.deleteChiTietHopDong);

export default router;
