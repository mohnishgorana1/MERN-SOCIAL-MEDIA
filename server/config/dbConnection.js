import mongoose from "mongoose";

const PORT = process.env.PORT || 8000;
const connectToDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("MONGO DB CONNECTED ! ", conn.connection.host);
  } catch (error) {
    console.log("Error connecting to DB ", error.message);
    process.exit();
  }
};


export default connectToDB;