import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

import authRouter from "./router/authRouter";
import userRouter from "./router/userRouter";
import postRouter from "./router/postRouter";

dotenv.config();
const app=express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

const URI=process.env.MONGODB_URL;
mongoose.connect(URI!).then(()=>{
  console.log("db connected");
}).catch((e)=>{
  console.log(e.message);
});

app.use("/api", authRouter);
app.use("/api", userRouter);
app.use("/api", postRouter);

const PORT=process.env.PORT || 4000;
app.listen(PORT, ()=>{
  console.log("server on "+PORT);
});