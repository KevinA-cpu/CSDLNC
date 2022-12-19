import { Router } from "express";
import controller from "./controller.js";

const router = Router();

router.get("/",controller.getDoiTac);

router.get("/MaDT",controller.getDoiTacByID);

router.post("/",controller.insertDoiTac);

router.put("/",controller.updateDoiTac);

router.delete("/",controller.deleteDoiTac);

export default router;