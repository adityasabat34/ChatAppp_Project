import generateToken from "../utils/generateWebToken.js";
import { hashPassword } from "../utils/hashPassword.js";
import { findUserByEmail } from "../service/user.service.js";
import { createUser } from "../service/user.service.js";
import bcrypt from "bcryptjs";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

const signup = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    throw new ApiError(400, "All fields are require!");
  }

  if (password.length < 6) {
    throw new ApiError(400, "Password must be at least 6 characters long.");
  }

  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new ApiError(400, "email already exist");
  }

  const hashedPassword = await hashPassword(password);

  const newUser = await createUser({
    fullName,
    email,
    password: hashedPassword,
  });

  if (newUser) {
    const token = generateToken(newUser._id, res);

    res.status(201).json(
      new ApiResponse(
        201,
        {
          _id: newUser._id,
          fullName: newUser.fullName,
          email: newUser.email,
          profilePic: newUser.profilePic,
          token,
        },
        "user successfully created"
      )
    );
  } else {
    throw new ApiError(400, "Invalid user data");
  }
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const userExist = await findUserByEmail(email);

  if (!userExist) {
    throw new ApiError(400, "Invalid credentials");
  }

  const isPasswordCorrect = await bcrypt.compare(
    password, // frontend incoming password
    userExist.password // database password
  );

  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid credentials");
  }

  const token = generateToken(userExist._id, res);

  res.status(200).json(
    new ApiResponse(
      200,
      {
        _id: userExist._id,
        fullName: userExist.fullName,
        email: userExist.email,
        profilePic: userExist.profilePic,
        token,
      },
      "user successfully logged in"
    )
  );
});

const logout = asyncHandler(async (req, res) => {
  const token = req.cookies.jwt;

  if (!token) {
    throw new ApiError(401, "No token found. User already logged out.");
  }

  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    throw new ApiError(401, "Invalid or expired token");
  }

  console.log("User logging out:", decoded);

  res.clearCookie("jwt", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res
    .status(200)
    .json(new ApiResponse(200, decoded, "Logged out successfully"));
});

export { signup, login, logout };
