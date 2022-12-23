import { Router } from "express";
import controller from "./controller.js";
import controllerThucDon from "../ThucDon/controller.js";

const router = Router();

router.get("/", controller.getDoiTac);

router.post("/XemDonHang",controller.ShowDonHang);

router.post("/MaDT",controller.getDoiTacByID);

router.post("/ThucDon",controller.getThucDonByMaDT)

router.post("/Add_ThucDon",controllerThucDon.insertThucDon);

router.get("/getAvailableDoiTac", controller.getAvailableDoiTac);

router.post("/", controller.insertDoiTac);

router.put("/", controller.updateDoiTac);

router.put("/NhanDonHang", controller.NhanDonHang);

router.delete("/", controller.deleteDoiTac);

export default router;
