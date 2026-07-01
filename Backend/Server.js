import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcryptjs";
import Users from "./models/Users.js";

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/loginDB")
  .then(() => console.log("MongoDB connected"))
  .catch((error) => {
    console.error(error);
  });

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const oldUser = await Users.findOne({ email });

    if (oldUser) {
      return res.status(400).json({
        message: "Email already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new Users({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({
      message: "Registration successful",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
    });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "Email not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    res.json({
      message: "Login successful",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
    });
  }
});

app.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "Email not found",
      });
    }

    const resetCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    user.resetCode = resetCode;
    user.resetCodeExpire = Date.now() + 10 * 60 * 1000;

    await user.save();

    res.json({
      message: "Reset code generated successfully",
      resetCode,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
    });
  }
});

app.post("/reset-password", async (req, res) => {
  try {
    const { email, resetCode, newPassword } = req.body;

    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "Email not found",
      });
    }

    if (user.resetCode !== resetCode) {
      return res.status(400).json({
        message: "Invalid reset code",
      });
    }

    if (user.resetCodeExpire < Date.now()) {
      return res.status(400).json({
        message: "Reset code expired",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetCode = undefined;
    user.resetCodeExpire = undefined;

    await user.save();

    res.json({
      message: "Password reset successful",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});