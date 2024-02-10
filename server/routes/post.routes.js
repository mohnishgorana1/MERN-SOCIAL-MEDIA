import express from "express";
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  likePost,
  updatePost,
  getPostsBySearch
} from "../controllers/post.controller.js";
import auth from "../middlewares/auth.middleware.js";

const router = express.Router();


router.get("/search", getPostsBySearch);
router.get("/", getPosts);
router.post("/", auth, createPost);
router.get("/:id", getPost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likePost", auth, likePost);

export default router;
