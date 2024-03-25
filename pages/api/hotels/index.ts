import connectDB from "@/db";
import Hotel from "@/models/hotel-model";
import { NextApiRequest, NextApiResponse } from "next";

interface GetRequest extends NextApiRequest {
  query: {
    city?: string;
  };
}



export default async function handler(req :NextApiRequest, res :NextApiResponse) {
  connectDB();
    if (req.method === "POST") {
      console.log(req.body,"ss")
      const inputData = {
        name: 'sdddds',
        description: 'ddsfdddddd',
        banner: 'sddddddfd',
        gallery: ['gallery', 'gallery'],
        price: 12.12,
        location: 'gujarat',
        facilities: [
          { img: 'img1', name: 'name1' },
          { img: 'img2', name: 'name2' }
        ]
      };
  
      const newHotel = new Hotel(req.body);
      console.log(newHotel,"sssssssssss");
      const result = await newHotel.save(); 
      res.status(201).json({ msg: "Hotel added !", result });
    }

  if (req.method === "GET") {
    const hotels = await Hotel.find({ location: req.query.city });
    if (hotels.length > 0) {
      return res.status(200).json({ msg: "Good", hotels });
    }
    const allhotels = await Hotel.find({});
    return res.status(200).json({ msg: "Good", allhotels });
  }
}
