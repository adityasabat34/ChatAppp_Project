import User from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getAllUsers = asyncHandler(async (req, res) => {
  const loggedInUserId = req.user?._id;

  const filteredUsers = await User.find({ id: { $ne: loggedInUserId } }).select(
    "-password"
  );

  res
    .status(200)
    .json(new ApiResponse(200, filteredUsers, "All User data fetched"));
});

export { getAllUsers };
