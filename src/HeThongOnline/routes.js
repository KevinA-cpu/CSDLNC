import { Router } from "express";
import controller from "./controller.js";

const router = Router();

router.get("/", controller.getHeThongOnline);

router.get(
  "/getHeThongOnlineWithThreeParams",
  controller.getHeThongOnlineWithThreeParams
);

router.put("/", controller.updateHeThongOnline);
export default router;
