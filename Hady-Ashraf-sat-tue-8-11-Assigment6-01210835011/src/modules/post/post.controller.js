import { Router } from "express";
import postService from "./post.service.js";

const router = Router();

router.post("/post/create", postService.createPost);

router.get("/posts", postService.getPosts);

router.delete("/post/:id", postService.deletePost);

router.get("/posts/details", postService.getPostsDetails);

router.get("/posts/comments-count", postService.getPostsComments);

export default router;
