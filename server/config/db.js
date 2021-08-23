import mongoose from "mongoose";
import colors from "colors";

const ConnectDB = () => {
  console.log("Connecting to MongoDB...".yellow);

  const conn = mongoose
    .connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    })
    .then(() => {
      console.log(
        "MongoDB connection established successfully".green.underline
      );
    })
    .catch((err) => {
      console.log(
        `Error connecting to MongoDB ${err.message}`.red.underline.bold
      );
    });
};
export default ConnectDB;
