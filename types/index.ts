import { MouseEventHandler } from "react";
import  { Document } from "mongoose";


export interface BlockProps {
    title?: string;
    para?: string;
    imageUrl?: string;
}

export interface City {
    name: string;
}

export interface LoginRequestBody {
    email : string;
    password : string;
}

export interface RegisterRequestBody extends LoginRequestBody {
    name? : string;
}

export interface HotelType {
    title?: string;
    para?: string;
    imageUrl?: string;
}

export interface IHotel extends Document {
    name: string;
    description: string;
    banner: string;
    gallery?: string[];
    price?: number;
    facilities: {img : string, name : string}[];
    location?: string;
  }



export interface LoginProps {}
