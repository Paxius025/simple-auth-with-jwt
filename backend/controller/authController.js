import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  createUser,
  getUserByUsername,
  getUserByEmail,
} from "../models/userModel.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUsername = await getUserByUsername(username);
    if (existingUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const existingEmail = await getUserByEmail(email);
    if (existingEmail) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser(username, email, hashedPassword);

    if (!newUser.id) {
      return res
        .status(500)
        .json({ message: "User created but failed to return ID" });
    }

    const token = jwt.sign(
      { id: newUser.id, username, email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    console.log("SECRET:", process.env.JWT_SECRET);
    console.log("EXPIRES_IN:", process.env.JWT_EXPIRES_IN);

    res.status(201).json({ message: "User created", token });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// TODO : How do login with Username or Email
export const login = async (req, res) => {
  const { usernameOrEmail, password } = req.body;
  let userAccount = await getUserByUsername(usernameOrEmail);

  if(!userAccount){
      userAccount = await getUserByEmail(usernameOrEmail);
  }
  
  if (!userAccount || !(await bcrypt.compare(password, userAccount.password))) {
    return res.status(401).json({ message: "Invalid credential" });
  }
  const token = jwt.sign({ id: userAccount.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  res.json({ message: "Login sucess",token });
};
