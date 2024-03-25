import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/db";
import Hotel from "@/models/hotel-model";
import { IHotel } from "@/types";

interface GetRequest extends NextApiRequest {
  query: {
    val: string | string[];
  };
}

export default async function handler(req: GetRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    connectDB();
    try {
      const key: string | string[] | undefined = req.query.val;
      if (!key) {
        throw new Error("Query parameter 'val' is missing or invalid");
      }
      const hotels: IHotel[] = await Hotel.find({ "facilities.name": { $in: Array.isArray(key) ? key : [key] } });
      res.status(200).json({ msg: "All Good", hotels });
    } catch (error) {
      res.status(500).json({ msg: "Internal Server Error", error: error instanceof Error ? error.message : "" });
    }
  } else {
    res.status(405).json({ msg: "Method Not Allowed" });
  }
}
