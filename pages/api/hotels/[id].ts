import connectDB from "@/db";
import Hotel from "@/models/hotel-model";
import { NextApiRequest, NextApiResponse } from "next";

interface GetRequest extends NextApiRequest {
    query: {
      id?: string;
    };
  }


export default async function handler(req : GetRequest,res :NextApiResponse){
    if(req.method==="GET"){
        connectDB();
        if(req.query.id){
            const hotel = await Hotel.findById(req.query.id);
            res.status(200).json({msg:"Good" , hotel});
        }
    }
}