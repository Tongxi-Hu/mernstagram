import express from "express";
import commentController from "../controller/commentController";
import {auth} from "../middleware/auth";

const commentRouter=express.Router();

commentRouter.post("/comment", auth, commentController.createComment);
commentRouter.patch("/comment/:id", auth, commentController.updateComment);
commentRouter.patch("/comment/:id/like", auth, commentController.likeComment);
commentRouter.patch("/comment/:id/unlike", auth, commentController.unlikeComment);

export default commentRouter;