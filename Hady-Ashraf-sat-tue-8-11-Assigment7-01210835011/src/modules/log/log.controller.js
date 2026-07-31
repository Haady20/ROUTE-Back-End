import { Router } from "express";
import { createLogCollection, createLog } from "../log/log.service.js";

const router = Router();

router.post("/collection/logs/capped", createLogCollection);
router.post("/logs", createLog);

export default router;
