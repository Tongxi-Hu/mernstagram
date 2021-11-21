import mongoose, {ObjectId} from "mongoose";

export interface MessageType extends mongoose.Document {
  content: string,
  sender: ObjectId
}

const messageSchema=new mongoose.Schema({
  content: {type: String, required: true},
  sender: {type: mongoose.Types.ObjectId, ref: "User", required: true}
}, {
  timestamps: true
});

export default mongoose.model<MessageType>("Message", messageSchema);