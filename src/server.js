require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3005;
const { connectDB } = require("./config/connect");
const authRouter = require("./router/users");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/auth", authRouter);

// kết nối tới mongoose
// Sử dụng async/await để đảm bảo rằng kết nối DB thành công trước khi server lắng nghe
const startServer = async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
};

startServer();
