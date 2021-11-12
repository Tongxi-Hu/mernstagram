import Comment from "../model/Comment";
import {Request, Response} from "express";
import Post from "../model/Post";

const createComment=async (req: Request, res: Response)=>{
  try {
    const {postId, content,reply,tag,tagname}=req.body;
    // @ts-ignore
    const newComment=new Comment({user: req.user._id, content, reply, username: req.user.username,tag,tagname});
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
    const newComment=await Comment.findByIdAndUpdate(id, {content: newContent}).exec();
    if (!newComment) return res.status(400).json({msg: "no comment found"});
    res.json({msg: "comment updated"});
  } catch (e: any) {
    return res.status(500).json({msg: e.message});
  }
};

const deleteComment=async (req: Request, res: Response)=>{
  try {
    const {postId}=req.body;
    const id=req.params.id;
    await Comment.findByIdAndDelete(id).exec();
    await Post.findByIdAndUpdate(postId,{$pull:{comments:id}})
    res.json({msg: "comment deleted"});
  } catch (e: any) {
    return res.status(500).json({msg: e.message});
  }
};

const likeComment=async (req: Request, res: Response)=>{
  try {
    const id=req.params.id;
    // @ts-ignore
    const likedComment=await Comment.findByIdAndUpdate(id, {$push:{likes: req.user._id}},{new:true});
    if (!likedComment) return res.status(400).json({msg: "no comment found"});
    res.json({msg: "comment liked"});
  } catch (e: any) {
    return res.status(500).json({msg: e.message});
  }
};

const unlikeComment=async (req: Request, res: Response)=>{
  try {
    const id=req.params.id;
    // @ts-ignore
    const likedComment=await Comment.findByIdAndUpdate(id, {$pull:{likes: req.user._id}},{new:true});
    if (!likedComment) return res.status(400).json({msg: "no comment found"});
    res.json({msg: "comment unliked"});
  } catch (e: any) {
    return res.status(500).json({msg: e.message});
  }
};

const commentController={
  createComment,
  updateComment,
  deleteComment,
  likeComment,
  unlikeComment
};

export default commentController;