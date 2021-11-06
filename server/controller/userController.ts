import User from "../model/User";
import {Request, Response} from "express";

const searchUser=async (req: Request, res: Response)=>{
  try {
    const users=await User.find({username: {$regex: `${req.query.username}`, $options: "i"}}).limit(10);
    res.json({msg: "meet new friends!", users});
  } catch (e: any) {
    return res.status(500).json({msg: e.message});
  }
};

const getUserInfo=async (req: Request, res: Response)=>{
  try {
    const user=await User.findById(req.params.id);
    if (!user) return res.status(400).json({msg: "user does not exist"});
    res.json({msg: "user detail found", user});
  } catch (e: any) {
    return res.status(500).json({msg: e.message});

  }
};

const updateUser=async (req: Request, res: Response)=>{
  try {
    const {avatar, fullname, mobile, address, story, website, gender}=req.body;
    if (!fullname) return res.status(400).json({msg: "missing full name"});
    // @ts-ignore
    await User.findByIdAndUpdate(req.user._id, {avatar, fullname, mobile, address, story, website, gender});
    res.json({msg: "update success"});
  } catch (e: any) {

  }
};

const userController={
  searchUser,
  getUserInfo,
  updateUser
};

export default userController;