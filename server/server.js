import express from "express";
import dotenv from "dotenv";
import ConnectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `Server successfully running in ${process.env.NODE_ENV} mode on port ${PORT}`
      .yellow.bold
  )
);
app.use("/api/products", productRoutes);
app.use(notFound);
app.use(errorHandler);

ConnectDB(); //Set Connection with mongo db
