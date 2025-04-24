import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema(
  {
    senderId: {
      type: String,
      ref: "User",
      require: true,
    },
    recieverId: {
      type: String,
      ref: "User",
      require: true,
    },
    text: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Mesaage", messageSchema);

export default Message;
