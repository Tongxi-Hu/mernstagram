import express from "express";
import commentController from "../controller/commentController";
import {auth} from "../middleware/auth";

const commentRouter = express.Router();

commentRouter.post("/comment",auth,commentController.createComment);

export default commentRouter;