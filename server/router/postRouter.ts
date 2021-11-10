import express from "express";
import postController from "../controller/postController";
import {auth} from "../middleware/auth";

const postRouter=express.Router();

postRouter.post("/post", auth, postController.createPost);
postRouter.get("/post", auth, postController.getPosts);
postRouter.patch("/post/:id", auth, postController.updatePost);
postRouter.patch("/post/:id/like", auth, postController.likePost);
postRouter.patch("/post/:id/unlike", auth, postController.unLikePost);

export default postRouter;