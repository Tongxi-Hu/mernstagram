import {Request, Response} from "express";
import Conversation from "../model/Conversation";
import Message, {MessageType} from "../model/Message";
import mongoose from "mongoose";

const getConversation=async (req: Request, res: Response)=>{

  const user2Id=new mongoose.Types.ObjectId(req.params.userId);
  try {
    const oldConversation=await Conversation.findOne({
      // @ts-ignore
      $or: [{user1: user2Id, user2: req.user._id},
        // @ts-ignore
        {user1: req.user._id, user2: user2Id}]
    }).populate<{ dialog: Array<MessageType> }>("dialog");
    if (oldConversation) return res.json({msg: "conversation found", conversation: oldConversation});
    const newConversation=await Conversation.create({
      // @ts-ignore
      user1: req.user._id,
      user2: user2Id
    });
    return res.json({msg: "start new conversation", conversation: newConversation});
  } catch (e: any) {
    return res.status(500).json({msg: e.message});
  }
};

const sendNewMessage=async (req: Request, res: Response)=>{
  try {
    const content=req.body.content;
    // @ts-ignore
    const message=await Message.create({content, sender: req.user._id});
    const updatedConversation=await Conversation.findByIdAndUpdate(req.params.id, {$push: {dialog: message._id}});
    if (!updatedConversation) return res.status(400).json({msg: "no conversation found"});
    return res.json({msg: "message sent", message});
  } catch (e: any) {
    return res.status(500).json({msg: e.message});
  }
};

export default {getConversation, sendNewMessage};