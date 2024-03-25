import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/db";
import Hotel from "@/models/hotel-model";
import { IHotel } from "@/types";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    connectDB();
    try {
      const priceString: string | string[] | undefined = req.query.price;
      if (!priceString) {
        throw new Error("Price parameter is missing or invalid");
      }
      const price: number = parseInt(Array.isArray(priceString) ? priceString[0] : priceString, 10);
      if (isNaN(price)) {
        throw new Error("Price parameter is invalid");
      }
      const hotels: IHotel[] = await Hotel.find({ price: { $lte: price } });
      res.status(200).json({ msg: "Range Filter.", hotels });
    } catch (error) {
      res.status(500).json({ msg: "Internal Server Error", error: error instanceof Error ? error.message : "" });
    }
  } else {
    res.status(405).json({ msg: "Method Not Allowed" });
  }
}
