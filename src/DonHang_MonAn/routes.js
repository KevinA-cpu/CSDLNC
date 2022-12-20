import { Router } from "express";
import controller from "./controller.js";

const router = Router();

router.get("/", controller.getDonHang_MonAn);

router.get("/MaDH", controller.getDonHang_MonAnByMaDH);

router.get("/MaDT", controller.getDonHang_MonAnByMaDT);

router.post("/", controller.insertDonHang_MonAn);

router.delete("/MaDH&TenMon", controller.deleteDonHang_MonAn);
export default router;
