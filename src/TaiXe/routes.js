import { Router } from "express";
import controller from "./controller.js";

const router = Router();

router.get("/", controller.getTaiXe);

router.get("/MaTX", controller.getTaiXeWithMaTX);

router.put("/chooseDonDatHang", controller.chooseDonDatHang);

router.put("/undoDonDatHang", controller.undoDonDatHang);

export default router;
