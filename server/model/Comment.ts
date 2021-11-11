import mongoose, {ObjectId} from "mongoose";

export interface CommentType extends mongoose.Document {
  content: string,
  tag: Object,
  reply: ObjectId,
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
  reply: mongoose.Types.ObjectId,
  likes: [{type: mongoose.Types.ObjectId, ref: "User"}],
  user: {type: mongoose.Types.ObjectId, ref: "User", required: true},
  username: {type: String, required: true}
}, {
  timestamps: true
});

export default mongoose.model<CommentType>("Comment", commentSchema);