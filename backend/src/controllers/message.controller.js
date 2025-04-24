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

const getMesaages = asyncHandler(async (req, res) => {
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

export { getAllUsers, getMesaages };
