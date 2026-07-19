import express from "express";
import { ConnectionDB, SyncDB } from "./DB/connectionDB.js";
import "./DB/associations.js";

import userRouter from "./modules/user/user.controller.js";
import postRouter from "./modules/post/post.controller.js";
import commentRouter from "./modules/comment/comment.controller.js";

const app = express();
const port = 3000;

export const bootstrap = () => {
  app.use(express.json());

  app.get("/", (req, res) => {
    return res.status(200).json({ message: "Welcome" });
  });

  ConnectionDB();
  SyncDB();

  app.use(userRouter);
  app.use(postRouter);
  app.use(commentRouter);

  app.use("/{*demo}", (req, res) => {
    return res.status(404).json({
      message: "404 URL Not Found",
    });
  });

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};
