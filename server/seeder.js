import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import products from "./data/products.js";
import users from "./data/users.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import ConnectDB from "./config/db.js";

dotenv.config();
ConnectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users); //adding dummy users
    const adminUserId = createdUsers[0]._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUserId }; //adding user property "product added by admin user"
    });
    await Product.insertMany(sampleProducts); //adding dummy products
    console.log("Data Import Success".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`Erorr seeding data ${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    console.log("Data Destroyed !".red.inverse);

    process.exit();
  } catch (error) {
    console.error(`Erorr destroying data ${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
