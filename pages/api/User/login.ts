import connectDB from "@/db";
import User from "@/models/user-model";
import { LoginRequestBody } from "@/types";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        connectDB();
        const { email, password }: LoginRequestBody = req.body;
        if (!email || !password) {

            return res.status(201).json({ msg: "Email and password required !" });
        }
        const emailExists = await User.findOne({ email });
        if (!emailExists) {
            return res.status(201).json({ msg: "Please Register first !" });
        }
        const passwordMatched = await bcrypt.compare(
            password.toString(),
            emailExists.password
        );

        if (passwordMatched) {
            const token = jwt.sign({ token: emailExists._id }, process.env.JWT_SECRET || "mihir", {
                expiresIn: "30d",
            });

            return res.status(200).json({ msg: "Logged in successfully !", token });
        }
        return res.status(400).json({ msg: "Invalid Credentitials !" });
    }
}
