import User, {UserType} from "../model/User";
import jwt, {JwtPayload} from "jsonwebtoken";
import {NextFunction, Request, Response} from "express";


export const auth=async (req:Request, res: Response, next: NextFunction)=>{
  try {
    const token=req.header("Authorization");
    if (!token) return res.status(401).json({msg: "unauthorized"});
    const decoded=jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
    if (!decoded) return res.status(401).json({msg: "unauthorized"});
    const user=await User.findOne({_id: (decoded as JwtPayload).id});
    if (!user) return res.status(401).json({msg: "unauthorized"});
    // @ts-ignore
    req.user=user;
    next();
  } catch (e: any) {
    return res.status(500).json({msg: e.message});
  }
};