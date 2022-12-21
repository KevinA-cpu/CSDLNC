import { Router } from "express";
// import controllerDoiTac from "./controller.js";
import controllerThucDon from "../ThucDon/controller.js";
import controller from "./controller.js";

const router = Router();

router.get("/",controller.getHeThongOnline);

router.get("/ThucDon_MaDT",controllerThucDon.getThucDonByMaDT);

// router.post("/",controller.insertHeThongOnline);

// router.put("/",controller.updateHeThongOnline);

// router.delete("/",controller.deleteHeThongOnline);

export default router;