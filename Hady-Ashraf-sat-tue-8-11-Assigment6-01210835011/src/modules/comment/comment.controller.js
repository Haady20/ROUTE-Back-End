import { Router } from "express";
import commentService from "./comment.service.js";

const router = Router();

router.post("/comments", commentService.createBulkComments);

router.patch("/comments/:commentId", commentService.updateComment);

router.post("/comments/find-or-create", commentService.findOrCreateComment);

router.get("/comments/search", commentService.searchComments);

router.get("/comments/newest/:postId", commentService.getNewestComments);

router.get("/comments/:id", commentService.getCommentByPk);

export default router;
