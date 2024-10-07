require("dotenv").config();
const mongoose = require("mongoose");
const dbURL = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.y4jbh.mongodb.net/mydatabase?retryWrites=true&w=majority&appName=Cluster0`;

const connectDB = async () => {
  try {
    await mongoose.connect(dbURL);
    console.log("Kết nối thành công");
  } catch (error) {
    console.log("Kết nối không thành công", error);
    process.exit(1); // Thoát chương trình nếu kết nối DB thất bại
  }
};

module.exports = { connectDB };
