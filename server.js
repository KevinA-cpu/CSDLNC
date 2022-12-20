import Express from "express";
import cors from "cors";

import DonDatHangRouter from "./src/DonDatHang/routes.js";

const App = Express();

//Middlewares
App.use(Express.text());
App.use(cors());

//Routes
App.get("/", (req, res) => {
  res.send("placeholder");
});

App.use("/api/v1/DonDatHang", DonDatHangRouter);

App.listen(3000, () => console.log(`App is listening on 3000`));
