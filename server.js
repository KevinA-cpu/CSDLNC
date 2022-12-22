import Express from "express";
import cors from "cors";
import DoiTacRouter from "./src/DoiTac/routes.js";
import HopDongRouter from "./src/HopDong/routes.js";
import ChiTietHopDongRouter from "./src/ChiTietHopDong/routes.js";
import DonDatHangRouter from "./src/DonDatHang/routes.js";
import DonHang_MonAnRouter from "./src/DonHang_MonAn/routes.js";
import TaiXeRouter from "./src/TaiXe/routes.js";
import HeThongOnlineRouter from "./src/HeThongOnline/routes.js";
import ThucDonRouter from "./src/ThucDon/routes.js";
import PhiHoaHongRouter from "./src/PhiHoaHong/routes.js";
import KhachHangRouter from "./src/KhachHang/routes.js";

const App = Express();

//Middlewares
App.use(Express.text());
App.use(cors());

//Routes
App.get("/", (req, res) => {
  res.send("placeholder");
});

App.use("/api/v1/DoiTac", DoiTacRouter);

App.use("/api/v1/HopDong", HopDongRouter);

App.use("/api/v1/ChiTietHopDong", ChiTietHopDongRouter);

App.use("/api/v1/DonDatHang", DonDatHangRouter);

App.use("/api/v1/DonHang_MonAn", DonHang_MonAnRouter);

App.use("/api/v1/HeThongOnline", HeThongOnlineRouter);

App.use("/api/v1/TaiXe", TaiXeRouter);

App.use("/api/v1/ThucDon", ThucDonRouter);

App.use("/api/v1/PhiHoaHong", PhiHoaHongRouter);

App.use("/api/v1/KhachHang", KhachHangRouter);

App.listen(3000, () => console.log(`App is listening on 3000`));
