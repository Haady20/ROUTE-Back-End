import { Router } from "express";
import { createAutor } from "../author/author.service.js";

const router = Router();

router.post("/collection/authors", createAutor);

export default router;
