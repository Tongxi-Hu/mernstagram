import express from "express";

import {auth} from "../middleware/auth";
import userController from "../controller/userController";

const userRouter=express.Router();

userRouter.get("/search", auth, userController.searchUser);
userRouter.get("/user/:id", auth, userController.getUserInfo);
userRouter.patch("/user", auth, userController.updateUser);

export default userRouter;