import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

import authRouter from "./router/authRouter";

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

const PORT=process.env.PORT || 4000;
app.listen(PORT, ()=>{
  console.log("server on "+PORT);
});