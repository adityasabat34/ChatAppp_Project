import generateToken from "../utils/generateWebToken.js";
import { hashPassword } from "../utils/hashPassword.js";
import { findUserByEmail } from "../service/user.service.js";
import { createUser } from "../service/user.service.js";
import bcrypt from "bcryptjs";

const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All field are require!" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long." });
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "email already exist" });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await createUser({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      const token = generateToken(newUser._id, res);
      //   const createdNewUser = await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
        token,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (err) {
    console.log("Error in signup controller", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userExist = await findUserByEmail(email);

    if (!userExist) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password, // frontend incoming password
      userExist.password // database password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(userExist._id, res);

    res.status(200).json({
      _id: userExist._id,
      fullName: userExist.fullName,
      email: userExist.email,
      profilePic: userExist.profilePic,
      token,
    });
  } catch (err) {}
};

const logout = (req, res) => {
  res.send("logout");
};

export { signup, login, logout };
