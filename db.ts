import mongoose, { ConnectOptions, Connection } from "mongoose";

const URI: string = process.env.MONGO_URI || "mongodb+srv://patelmihir1112:MongoDBPassWord@project.ej7nmtl.mongodb.net/oyo";
              

let cachedDB: Connection | null = null;

const connectDB = async (): Promise<Connection> => {
  if (cachedDB) {
    return cachedDB;
  } else {
    try {
      const newDB = await mongoose.connect(URI, {
        useNewUrlParser: true,
      } as ConnectOptions); // Assertion to ConnectOptions to avoid type error
      console.log("Connected to MongoDB");
      cachedDB = newDB.connection;
      return newDB.connection;
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      throw error; // Re-throw the error for the caller to handle
    }
  }
};

export default connectDB;


