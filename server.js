import Express from "express";
import cors from "cors";
import DoiTacRouter from "./src/DoiTac/routes.js";

const App = Express();

App.use(Express.json());
App.use(cors());

App.get("/", (req, res) => {
  res.send("placeholder");
});

App.use("/DoiTac",DoiTacRouter);

App.listen(3000, () => console.log(`App is listening on 3000`));