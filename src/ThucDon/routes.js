import { Router } from "express";
import controller from "./controller.js";

const router = Router();

router.get("/",controller.getThucDon);

router.get("/MaDT",controller.getThucDonByMaDT);

router.post("/",controller.insertThucDon);

// router.put("/",controller.updateThucDon);

router.delete("/",controller.deleteThucDon);

export default router;