import express from "express";
import commentController from "../controller/commentController";
import {auth} from "../middleware/auth";

const commentRouter=express.Router();

commentRouter.post("/comment", auth, commentController.createComment);
commentRouter.patch("/comment/:id", auth, commentController.updateComment);

export default commentRouter;