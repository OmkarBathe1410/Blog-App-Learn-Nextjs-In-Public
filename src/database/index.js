import mongoose from "mongoose";

const connectToDB = async () => {
  const connectionUrl = process.env.DB_URL || '';

  mongoose
    .connect(connectionUrl)
    .then(() => console.log("Blog Database Connected Successfully!"))
    .catch((error) => console.log(error));
};

export default connectToDB;