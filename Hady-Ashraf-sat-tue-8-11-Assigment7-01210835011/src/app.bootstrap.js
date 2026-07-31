import express from "express";
import connectionStatus from "./DB/connectionDB.js";
import bookRouter from "./modules/book/book.controller.js";
import authorRouter from "./modules/author/author.controller.js";
import logRouter from "./modules/log/log.controller.js";

export const app = express();
const port = 3000;

export const bootstrap = async () => {
  await connectionStatus();

  app.use(express.json());

  app.get("/", (req, res) => {
    return res.status(200).json({ message: "Welcome!" });
  });

  app.use("/", bookRouter);
  app.use("/", authorRouter);
  app.use("/", logRouter);

  app.use("/{*demo}", (req, res) => {
    return res.status(404).json({ message: "404 URL not found!" });
  });

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};
