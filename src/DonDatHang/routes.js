import { Router } from "express";
import controller from "./controller.js";

const router = Router();

router.get("/", controller.getDonDatHang);

router.get("/MaDH", controller.getDonDatHangByMaDH);

router.post("/", controller.insertDonDatHang);

router.delete("/MaDH", controller.deleteDonDatHang);

export default router;
