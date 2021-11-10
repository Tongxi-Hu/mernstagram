import Post from "../model/Post";
import {Request, Response} from "express";

const createPost=async (req: Request, res: Response)=>{
  try {
    const {content, images}=req.body;
    if (images.length===0) return res.status(500).json({msg: "please add your photo"});
    // @ts-ignore
    const newPost=new Post({content, images, user: req.user._id, username: req.user.username});
    await newPost.save();
    res.json({msg: "post created", newPost});
  } catch (e: any) {
    return res.status(500).json({msg: e.message});
  }
};

const getPosts=async (req: Request, res: Response)=>{
  try {
    // @ts-ignore
    const posts=await Post.find({user: [...req.user.following, req.user._id]}).sort("-createdAt");
    res.json({msg: "new posts", result: posts.length, posts});
  } catch (e: any) {
    return res.status(500).json({msg: e.message});
  }
};

const updatePost=async (req: Request, res: Response)=>{
  try {
    const id=req.params.id;
    const {content, images}=req.body;
    if (images.length===0) return res.status(500).json({msg: "please add your photo"});
    const updatedPost=await Post.findByIdAndUpdate(id, {content, images}).exec();
    res.json({msg: "post updated", updatedPost});
  } catch (e: any) {
    return res.status(500).json({msg: e.message});
  }
};

const likePost=async (req: Request, res: Response)=>{
  try {
    const id=req.params.id;
    const {likes}=req.body;
    const updatedPost=await Post.findByIdAndUpdate(id, {likes}).exec();
    res.json({msg: "post liked", updatedPost});
  } catch (e: any) {
    return res.status(500).json({msg: e.message});
  }
};
const unLikePost=async (req: Request, res: Response)=>{
  try {
    const id=req.params.id;
    const {likes}=req.body;
    const updatedPost=await Post.findByIdAndUpdate(id, {likes}).exec();
    res.json({msg: "post unliked", updatedPost});
  } catch (e: any) {
    return res.status(500).json({msg: e.message});
  }
};

const postController={
  createPost,
  getPosts,
  updatePost,
  likePost,
  unLikePost
};

export default postController;