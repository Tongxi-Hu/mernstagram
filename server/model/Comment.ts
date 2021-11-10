import mongoose from "mongoose";

export interface CommentType extends mongoose.Document {}

const commentSchema=new mongoose.Schema({}, {
  timestamps: true
});

export default mongoose.model<CommentType>("Comment", commentSchema);