import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      res.status(404).json({ message: "User doesn't exist" });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      res.status(400).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test",
      {
        expiresIn: "1h",
      }
    );
    console.log("USER LOGGED IN: ", existingUser);

    res.status(200).json({
      message: "User login success",
      result: existingUser,
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: "server error on login" });
  }
};

export const register = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists with that user!" });
    }
    if (password !== confirmPassword) {
      return res
        .status(401)
        .json({ message: "Password and Confirm Password are not same." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      name: `${firstName} ${lastName}`,
      email: email,
      password: hashedPassword,
    });

    const token = jwt.sign({ sign: result.email, id: result._id }, "test", {
      expiresIn: "1hr",
    });

    console.log("USER CREATED: ", result);

    res.status(200).json({
      message: "User register success",
      result: result,
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: "server error on register user!" });
  }
};
