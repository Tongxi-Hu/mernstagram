import express from "express";
import postController from "../controller/postController";
import {auth} from "../middleware/auth";

const postRouter=express.Router();

postRouter.post("/post",auth,postController.createPost);

export default postRouter;