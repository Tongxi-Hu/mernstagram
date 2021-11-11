import Comment from "../model/Comment";
import {Request, Response} from "express";
import Post from "../model/Post";

const createComment=async (req: Request, res: Response)=>{
  try {
    const {postId, content, tag, reply}=req.body;
    // @ts-ignore
    const newComment=new Comment({user: req.user._id, content, tag, reply, username: req.user.username});
    await Post.findByIdAndUpdate(postId, {$push: {comments: newComment._id}}, {new: true});
    await newComment.save();
    res.json({newComment, msg: "comment created"});
  } catch (e: any) {
    return res.status(500).json({msg: e.message});
  }
};

const updateComment=async (req: Request, res: Response)=>{
  try {
    const {newContent}=req.body;
    const id=req.params.id;
    await Comment.findByIdAndUpdate(id, {content: newContent}).exec();
    res.json({msg: "comment updated"});
  } catch (e: any) {
    return res.status(500).json({msg: e.message});
  }
};

const commentController={
  createComment,
  updateComment
};

export default commentController;