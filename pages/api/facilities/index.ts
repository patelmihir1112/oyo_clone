import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/db";
import Hotel from "@/models/hotel-model";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    connectDB();
    try {
      const facilities: string[] = await Hotel.find({}).distinct("facilities.name");
      res.status(200).json({ msg: "Achha Lagta hai !", facilities });
    } catch (error) {
      res.status(500).json({ msg: "Internal Server Error  " });
    }
  } else {
    res.status(405).json({ msg: "Method Not Valid" });
  }
}
