import { Router } from "express";
import controllerDoiTac from "./controller.js";
import controllerThucDon from "../ThucDon/controller.js";

const router = Router();

router.get("/",controllerDoiTac.getDoiTac);

router.get("/MaDT",controllerDoiTac.getDoiTacByID);

router.get("/ThucDon",controllerThucDon.getThucDonByMaDT)

router.post("/",controllerDoiTac.insertDoiTac);

router.put("/",controllerDoiTac.updateDoiTac);

router.delete("/",controllerDoiTac.deleteDoiTac);

router.post("/Add_ThucDon",controllerThucDon.insertThucDon);

// router.put("/Update_ThucDon",controllerThucDon.updateThucDon);

router.delete("/Del_ThucDon",controllerThucDon.deleteThucDon);

export default router;