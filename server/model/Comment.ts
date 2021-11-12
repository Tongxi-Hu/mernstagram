import mongoose, {ObjectId} from "mongoose";
import {UserType} from "./User";

export interface CommentType extends mongoose.Document {
  content: string,
  tag?: ObjectId,
  tagname?:string,
  reply?: ObjectId,
  likes: Array<ObjectId>,
  user: ObjectId,
  username: string,
}

const commentSchema=new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  tag: Object,
  tagname:String,
  reply: mongoose.Types.ObjectId,
  likes: [{type: mongoose.Types.ObjectId, ref: "User"}],
  user: {type: mongoose.Types.ObjectId, ref: "User", required: true},
  username: {type: String, required: true}
}, {
  timestamps: true
});

export default mongoose.model<CommentType>("Comment", commentSchema);