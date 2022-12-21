import { Router } from "express";
import controller from "./controller.js";
import controllerThucDon from "../ThucDon/controller.js"

const router = Router();

router.get("/", controller.getHeThongOnline);

router.get(
  "/getHeThongOnlineWithThreeParams",
  controller.getHeThongOnlineWithThreeParams
);

router.get("/ThucDon_MaDT",controllerThucDon.getThucDonByMaDT);

router.put("/", controller.updateHeThongOnline);
export default router;
