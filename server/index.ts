import express from "express";
import * as http from "http";
import {Server} from "socket.io";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

import SocketServer from "./socketServer";
import authRouter from "./router/authRouter";
import userRouter from "./router/userRouter";
import postRouter from "./router/postRouter";
import commentRouter from "./router/commentRouter";
import notifyRouter from "./router/notifyRouter";
import conversationRouter from "./router/conversationRouter";

dotenv.config();
const app=express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

const server=http.createServer(app);
const io=new Server(server);
io.on("connection", socket=>{
  SocketServer(socket);
});

const URI=process.env.MONGODB_URL;
mongoose.connect(URI!).then(()=>{
  console.log("db connected");
}).catch((e)=>{
  console.log(e.message);
});

app.use("/api", authRouter);
app.use("/api", userRouter);
app.use("/api", postRouter);
app.use("/api", commentRouter);
app.use("/api", notifyRouter);
app.use("/api", conversationRouter);

const PORT=process.env.PORT || 4000;
server.listen(PORT, ()=>{
  console.log("server on "+PORT);
});