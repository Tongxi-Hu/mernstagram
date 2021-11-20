import mongoose, {ObjectId} from "mongoose";

export interface NotifyType extends mongoose.Document {
  id: ObjectId,
  user: ObjectId,
  recipient: Array<ObjectId>,
  url: string,
  text: string,
  content: string,
  image: string,
  isRead: boolean,
}

const notifySchema=new mongoose.Schema({
  id: mongoose.Types.ObjectId,
  user: {type: mongoose.Types.ObjectId, ref: "User"},
  recipient: [mongoose.Types.ObjectId],
  url: String,
  text: String,
  content: String,
  image: String,
  isRead: {type: Boolean, default: false}
}, {
  timestamps: true
});

export default mongoose.model<NotifyType>("Notify", notifySchema);