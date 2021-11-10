import mongoose, {ObjectId, Schema} from "mongoose";

export interface PostType extends mongoose.Document {
  content: string;
  images: Array<string>;
  likes: Array<ObjectId>;
  comments: Array<ObjectId>;
  user: ObjectId;
}

const postSchema=new mongoose.Schema({
  content: String,
  images: {
    type: Array,
    required: true
  },
  likes: [{type: mongoose.Types.ObjectId, ref: "User"}],
  comments: [{type: mongoose.Types.ObjectId, ref: "Comment"}],
  user: {type: mongoose.Types.ObjectId, ref: "User"}
}, {
  timestamps: true
});

export default mongoose.model<PostType>("Post", postSchema);