import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getAllUsers = asyncHandler(async (req, res) => {
  const loggedInUserId = req.user?._id;

  const filteredUsers = await User.find({
    _id: { $ne: loggedInUserId },
  }).select("-password");

  res
    .status(200)
    .json(new ApiResponse(200, filteredUsers, "All User data fetched"));
});

const getMessages = asyncHandler(async (req, res) => {
  const { id: userToChatId } = req.params;

  const myId = req.user._id;

  const messages = await Message.find({
    $or: [
      { senderId: myId, recieverId: userToChatId },
      { senderId: userToChatId, recieverId: myId },
    ],
  });

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        messages,
        "previous and latest messages fetched successfully"
      )
    );
});

const sendMessages = asyncHandler(async (req, res) => {
  const { id: recieverId } = req.params;
  const { text, image } = req.body;
  const senderId = req.user._id;
  console.log(text);

  let imageUrlFromCloudinary = "";

  if (image) {
    const uploadResponse = await cloudinary.uploader.upload(image);
    imageUrlFromCloudinary = uploadResponse.secure_url;
  }

  const newMessages = new Message({
    senderId,
    recieverId,
    text,
    image: imageUrlFromCloudinary,
  });

  const savedMessage = await newMessages.save();

  const recieverSocketId = getReceiverSocketId(recieverId);
  if (recieverSocketId) {
    io.to(recieverSocketId).emit("newMessage", newMessages); // (to) means send to particular user
  }

  res.status(200).json(new ApiResponse(201, savedMessage, "Message sent"));
});

export { getAllUsers, getMessages, sendMessages };
