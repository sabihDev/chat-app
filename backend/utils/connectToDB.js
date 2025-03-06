import mongoose from "mongoose";

const EstalishConnectionToDB = async (uri) => {
  try {
    const isConnection = await mongoose.connect(uri);
    console.log("Database connected successfully");

    return isConnection;
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1); // Exit the process in case of failure
  }
};

export default EstalishConnectionToDB;
