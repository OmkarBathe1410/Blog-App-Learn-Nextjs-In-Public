import mongoose from "mongoose";

const connectToDB = async () => {
  const connectionUrl =
    "mongodb+srv://omibathe:FogHPz6Eb8V1t89e@nextjsblogapp.ub84w.mongodb.net/";

  mongoose
    .connect(connectionUrl)
    .then(() => console.log("Blog Database Connected Successfully!"))
    .catch((error) => console.log(error));
};

export default connectToDB;