import Express from "express";
import cors from "cors";
import DoiTacRouter from "./src/DoiTac/routes.js";
import HopDongRouter from "./src/HopDong/routes.js";

const App = Express();

App.use(Express.text());
App.use(cors());

App.get("/", (req, res) => {
  res.send("placeholder");
});

App.use("/DoiTac",DoiTacRouter);

App.use("/HopDong",HopDongRouter);

App.listen(3000, () => console.log(`App is listening on 3000`));