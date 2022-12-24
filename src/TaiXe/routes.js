import { Router } from "express";
import controller from "./controller.js";

const router = Router();

router.get("/", controller.getTaiXe);

router.get("/MaTX", controller.getTaiXeWithMaTX);

router.get("/getDonDatHangOfTaiXe", controller.getDonDatHangOfTaiXe);

router.put("/chooseDonDatHang", controller.chooseDonDatHang);

router.put("/undoDonDatHang", controller.undoDonDatHang);

router.post("/", controller.insertTaiXe);

export default router;
