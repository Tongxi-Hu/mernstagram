import {Request, Response} from "express";
import Notify from "../model/Notify";
import User, {UserType} from "../model/User";

const createNotify=async (req: Request, res: Response)=>{
  try {
    const {id, url, text, content, image}=req.body;
    // @ts-ignore
    const author=await User.findById(req.user._id);
    // @ts-ignore
    const notify=await Notify.create({id, recipient: author.followers, url, text, content, image, user: req.user._id});
    return res.json({notify, msg: "notify success"});
  } catch (e: any) {
    return res.status(500).json({msg: e.message});
  }
};

const deleteNotify=async (req: Request, res: Response)=>{
  try {
    // @ts-ignore
    const notify=await Notify.findOneAndDelete({id: req.params.id, url: req.query.url});
    return res.json({msg: "notification deleted", notify});
  } catch (e: any) {
    return res.status(500).json({msg: e.message});
  }
};

const getNotify=async (req: Request, res: Response)=>{
  try {
    // @ts-ignore
    const notifies=await Notify.find({recipient: req.user._id,createdAt:{$gte:new Date((new Date().getTime() - (5 * 24 * 60 * 60 * 1000)))}})
                               .sort("-createdAt")
                               .populate<{ user: UserType }>("user", "avatar username");
    return res.json({msg: "notification found", notifies});
  } catch (e: any) {
    return res.status(500).json({msg: e.message});
  }
};

export default {createNotify, deleteNotify, getNotify};