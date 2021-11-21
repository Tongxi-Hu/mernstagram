import express from "express";
import conversationController from "../controller/conversationController";
import {auth} from "../middleware/auth";

const conversationRouter=express.Router();

conversationRouter.get("/conversation/:userId", auth, conversationController.getConversation);
conversationRouter.post("/conversation/:id", auth, conversationController.sendNewMessage);

export default conversationRouter;