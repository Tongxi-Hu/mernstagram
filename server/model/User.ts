import mongoose, {ObjectId, Schema} from "mongoose";

export interface UserType extends mongoose.Document {
  fullname: string,
  username: string,
  email: string,
  password: string,
  avatar: string,
  role: string,
  gender: string,
  mobile: string,
  address: string,
  story: string,
  website: string,
  followers: Array<ObjectId>,
  following: Array<ObjectId>,
  saved: Array<ObjectId>,
}

const userSchema:Schema=new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    trim: true,
    maxLength: 25
  },
  username: {
    type: String,
    required: true,
    trim: true,
    maxLength: 25
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  avatar: {
    type: String,
    default: "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png"
  },
  role: {type: String, default: "user"},
  gender: {type: String, default: "male"},
  mobile: {type: String, default: ""},
  address: {type: String, default: ""},
  story: {type: String, default: "", maxlength: 200},
  website: {type: String, default: ""},
  followers: [{type: mongoose.Types.ObjectId, ref: "User"}],
  following: [{type: mongoose.Types.ObjectId, ref: "User"}],
  saved: [{type: mongoose.Types.ObjectId, ref: "Post"}]
}, {timestamps: true});

export default mongoose.model<UserType>("User", userSchema);