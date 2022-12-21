import Express from "express";
import cors from "cors";
import DoiTacRouter from "./src/DoiTac/routes.js";
import HopDongRouter from "./src/HopDong/routes.js";
import ChiTietHopDongController from "./src/ChiTietHopDong/routes.js";
import ThucDonController from "./src/ThucDon/routes.js";
import HeThongOnlineController from "./src/HeThongOnline/routes.js";
import PhiHoaHongController from "./src/PhiHoaHong/routes.js";

const App = Express();

App.use(Express.text());
App.use(cors());

App.get("/", (req, res) => {
  res.send("placeholder");
});

App.use("/DoiTac",DoiTacRouter);

App.use("/HopDong",HopDongRouter);

App.use("/ChiTietHopDong",ChiTietHopDongController);

App.use("/ThucDon",ThucDonController);

App.use("/HeThongOnline",HeThongOnlineController);

App.use("/PhiHoaHong",PhiHoaHongController);

App.listen(3000, () => console.log(`App is listening on 3000`));