import connectDB from "@/db";
import User from "@/models/user-model";
import { RegisterRequestBody } from "@/types";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    connectDB();

    const { name, email, password }: RegisterRequestBody = req.body;
    if (!name || !email || !password) {

      return res.status(400).json({ msg: "All Fields are Mandatory !" });
    }
    const emailExists = await User.findOne({ email });
    if (emailExists) {

      return res.status(400).json({ msg: "User already Registered !" });

    }
    const hashedPassword = await bcrypt.hash(password.toString(), 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    const result = await newUser.save();
    const token = jwt.sign({ token: result._id }, process.env.JWT_SECRET || "mihir", {
      expiresIn: "1d",
    });
    return res
      .status(201)
      .json({ msg: "Registered Succesfully !", token });
  }
}
