import { Router } from "express";
import controller from "./controller.js";

const router = Router();

router.get("/MaKH", controller.getKhachHangByMaKH);

router.post("/", controller.insertKhachHang);

router.post("/dathang", controller.DatHang);

export default router;
