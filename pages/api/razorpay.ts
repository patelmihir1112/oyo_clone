import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/db';
import Razorpay from 'razorpay';
import shortid from 'shortid';
import Hotel from "@/models/hotel-model";
import { IHotel } from '@/types';

interface RazorpayOrderResponse {
  id: string;
  currency: string;
  amount: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    connectDB();
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY as string,
      key_secret: process.env.RAZORPAY_SECRET as string,
    });

    try {
      const hotel: IHotel | null = await Hotel.findById(req.body.id);
      if (!hotel) {
        throw new Error('Hotel not found');
      }

      const amount: number = Number(hotel.price);
      const options = {
        amount: (amount * 100).toString(),
        currency: 'INR',
        receipt: shortid.generate(),
        payment_capture: 1,
      };

      const result = await razorpay.orders.create(options);
      const orderResponse: RazorpayOrderResponse = {
        id: result.id,
        currency: result.currency,
        amount: Number(result.amount),
      };

      return res.status(201).json(orderResponse);
    } catch (err) {
      return res.status(400).json(err);
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
