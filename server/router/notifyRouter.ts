import express from "express";
import {auth} from "../middleware/auth";
import notifyController from "../controller/notifyController";

const notifyRouter=express.Router();

notifyRouter.post("/notify", auth, notifyController.createNotify);
notifyRouter.delete("/notify/:id", auth, notifyController.deleteNotify);
notifyRouter.get("/notify", auth, notifyController.getNotify);

export default notifyRouter;