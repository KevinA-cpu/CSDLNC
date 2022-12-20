import Express from "express";
import cors from "cors";

import DonDatHangRouter from "./src/DonDatHang/routes.js";
import DonHang_MonAnRouter from "./src/DonHang_MonAn/routes.js";

const App = Express();

//Middlewares
App.use(Express.text());
App.use(cors());

//Routes
App.get("/", (req, res) => {
  res.send("placeholder");
});

App.use("/api/v1/DonDatHang", DonDatHangRouter);

App.use("/api/v1/DonHang_MonAn", DonHang_MonAnRouter);

App.listen(3000, () => console.log(`App is listening on 3000`));
