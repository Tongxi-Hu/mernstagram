import User from "../model/User";
import {Request, Response} from "express";

const searchUser=async (req: Request, res: Response)=>{
  try {
    const users=await User.find({username: {$regex: `${req.query.username}`, $options: "i"}}).limit(10);
    res.json({msg:"meet new friends!",users});
  } catch (e: any) {
    return res.status(500).json({msg: e.message});
  }
};

const userController={
  searchUser
};

export default userController;