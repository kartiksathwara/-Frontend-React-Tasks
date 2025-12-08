import Users from "../models/Users.js";
import jwt from "jsonwebtoken";

export const creatUser = async (req, res) => {

  try {
    const { name, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password Can't Match" });
    }
    const existing = await Users.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User Already Exists" });
    }

    const newUser = new Users({ name, email, password });
    await newUser.save()

    res.status(201).json({ message: "User Registered Successfully", user: newUser });

  } catch (err) {
    console.log("Register Error:", err);
    res.status(500).json({ message: "Server Error:" });
  }
};


export const loginUser = async (req, res) => {

  try {
    const { email, password } = req.body

    const user = await Users.findOne({ email })
    if (!user) {
      return res.status(404).json({ message: "You don't have an account. Please register." });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Incorrect password." });
    }

     const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET, 
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login SuccessFul",
      user: { name: user.name, email: user.email },
      token
    });
  } catch (err) {
    console.log("Login Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getUSers = async (req, res) => {
  const users = await Users.find({});
  res.status(200).json(users);
};

