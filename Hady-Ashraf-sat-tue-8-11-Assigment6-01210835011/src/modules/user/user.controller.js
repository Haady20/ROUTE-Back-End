import { Router } from "express";
import userService from "./user.service.js";

const router = Router();

router.post("/user/create", userService.postUser);

router.put("/user/:id", userService.updateUser);

router.post("/user/email/:email", userService.getUserByEmail);

router.get("/user/:id", userService.getUserById);

export default router;
