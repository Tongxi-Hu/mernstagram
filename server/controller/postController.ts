import Post from "../model/Post";
import {Request, Response} from "express";
import Comment, {CommentType} from "../model/Comment";
import {Query} from "mongoose";
import User from "../model/User";

class APIFeatures {
  public query: Query<any, any>;
  public queryString: { page: string, limit: string };

  constructor(query: Query<any, any>, queryString: { page: string, limit: string }) {
    this.query=query;
    this.queryString=queryString;
  }

  paginating() {
    const page=Number(this.queryString.page) || 1;
    const limit=Number(this.queryString.limit) || 3;
    const skip=(page-1)*limit;
    this.query=this.query.skip(skip).limit(limit);
    return this;
  }
}

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
    const posts=await Post.find({user: [...req.user.following, req.user._id]})
                          .populate<{ comments: Array<CommentType> }>("comments")
                          .sort("-createdAt");
    res.json({msg: "new posts", result: posts.length, posts});
  } catch (e: any) {
    return res.status(500).json({msg: e.message});
  }
};

const getPostDetail=async (req: Request, res: Response)=>{
  const id=req.params.id;
  try {
    const post=await Post.findById(id)
                         .populate<{ comments: Array<CommentType> }>("comments")
                         .sort("-createdAt");
    if (!post) return res.status(400).json({msg: "post not found"});
    res.json({msg: "post detail found", post});
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
    if (!updatedPost) return res.status(400).json({msg: "post not found"});
    res.json({msg: "post updated", updatedPost});
  } catch (e: any) {
    return res.status(500).json({msg: e.message});
  }
};

const deletePost=async (req: Request, res: Response)=>{
  try {
    // @ts-ignore
    const post=await Post.findOneAndDelete({_id: req.params.id, user: req.user._id});
    if (!post) return res.status(400).json({msg: "post not found"});
    await Comment.deleteMany({_id: {$in: post.comments}});
    return res.json({msg: "post deleted"});
  } catch (e: any) {
    return res.status(500).json({msg: e.message});
  }
};

const likePost=async (req: Request, res: Response)=>{
  try {
    const id=req.params.id;
    const {likes}=req.body;
    const updatedPost=await Post.findByIdAndUpdate(id, {likes}).exec();
    if (!updatedPost) return res.status(400).json({msg: "post not found"});
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
    if (!updatedPost) return res.status(400).json({msg: "post not found"});
    res.json({msg: "post unliked", updatedPost});
  } catch (e: any) {
    return res.status(500).json({msg: e.message});
  }
};

const savePost=async (req: Request, res: Response)=>{
  try {
    // @ts-ignore
    const save=await User.findByIdAndUpdate(req.user._id, {$push: {saved: req.params.id}});
    if (!save) return res.status(400).json({msg: "user not exist"});
    return res.json({msg: "post saved"});
  } catch (e: any) {
    return res.status(500).json({msg: e.message});
  }
};

const unSavePost=async (req: Request, res: Response)=>{
  try {
    // @ts-ignore
    const unSave=await User.findByIdAndUpdate(req.user._id, {$pull: {saved: req.params.id}});
    if (!unSave) return res.status(400).json({msg: "user not exist"});
    return res.json({msg: "post unSaved"});
  } catch (e: any) {
    return res.status(500).json({msg: e.message});
  }
};

const getUserPosts=async (req: Request, res: Response)=>{
  try {
    // @ts-ignore
    const posts=await Post.find({user: req.params.id}).populate<{ comments: Array<CommentType> }>("comments")
                          .sort("-createdAt");
    res.json({msg: "users posts", posts});
  } catch (e: any) {
    return res.status(500).json({msg: e.message});
  }
};

const getSavedPosts=async (req: Request, res: Response)=>{
  try {
    // @ts-ignore
    const user=await User.findById(req.user._id);
    if (!user) return res.status(400).json({msg: "user not exist"});
    const posts=await Post.find({_id: {$in: user.saved}});
    res.json({msg: "saved posts", posts});
  } catch (e: any) {
    return res.status(500).json({msg: e.message});
  }
};

const getPostsDiscover=async (req: Request, res: Response)=>{
  try {

    // @ts-ignore
    const features=new APIFeatures(Post.find({user: {$nin: [...req.user.following, req.user._id]}}), req.query).paginating();
    const posts=await features.query.populate<{ comments: Array<CommentType> }>("comments")
                              .sort("-createdAt");
    res.json({msg: "posts discovered", posts});
  } catch (e: any) {
    return res.status(500).json({msg: e.message});
  }
};

const postController={
  createPost,
  getPosts,
  getPostDetail,
  updatePost,
  deletePost,
  likePost,
  unLikePost,
  savePost,
  unSavePost,
  getUserPosts,
  getSavedPosts,
  getPostsDiscover
};

export default postController;