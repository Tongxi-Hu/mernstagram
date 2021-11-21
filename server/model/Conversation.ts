import mongoose, {ObjectId} from "mongoose";

export interface ConversationType extends mongoose.Document {
  dialog: [ObjectId],
  user1: ObjectId,
  user2: ObjectId,
}

const conversationSchema=new mongoose.Schema({
  dialog: [{type: mongoose.Types.ObjectId, ref: "Message"}],
  user1: {type: mongoose.Types.ObjectId, ref: "User", required: true},
  user2: {type: mongoose.Types.ObjectId, ref: "User", required: true}
}, {
  timestamps: true
});

export default mongoose.model<ConversationType>("Conversation", conversationSchema);