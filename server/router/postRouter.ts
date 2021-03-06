import express from "express";
import postController from "../controller/postController";
import {auth} from "../middleware/auth";

const postRouter=express.Router();

postRouter.post("/post", auth, postController.createPost);
postRouter.get("/post", auth, postController.getPosts);
postRouter.get("/post/:id", auth, postController.getPostDetail);
postRouter.patch("/post/:id", auth, postController.updatePost);
postRouter.delete("/post/:id", auth, postController.deletePost);
postRouter.patch("/post/:id/like", auth, postController.likePost);
postRouter.patch("/post/:id/unlike", auth, postController.unLikePost);
postRouter.patch("/post/:id/save", auth, postController.savePost);
postRouter.patch("/post/:id/unsave", auth, postController.unSavePost);
postRouter.get("/user_post/:id", auth, postController.getUserPosts);
postRouter.get("/post_discover", auth, postController.getPostsDiscover);
postRouter.get("/saved", auth, postController.getSavedPosts);

export default postRouter;