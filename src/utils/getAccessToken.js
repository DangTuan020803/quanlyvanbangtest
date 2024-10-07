// const jwt = require("jsonwebtoken");
// require("dotenv").config();

// const getAccessToken = async (payload) => {
//   const token = jwt.sign(payload, process.env.SECRET_KEY);
//   return token;
// };

// // Ví dụ payload
// // const payload = {
// //   _id: "64ec0c12f2cabe001cbb489c", // thay bằng ObjectId thật
// //   email: "user@example.com",
// //   rule: 1,
// // };
// const payload = {
//   _id: "64ec0c12f2cabe001cbb489c", // thay bằng ObjectId thật
//   email: "user@example.com",
//   rule: 1,
// };
// getAccessToken(payload)
//   .then((token) => {
//     console.log("Generated Token:", token);
//   })
//   .catch((err) => {
//     console.error("Failed to generate token", err);
//   });
// module.exports = { getAccessToken };
const jwt = require("jsonwebtoken");
require("dotenv").config();

const getAccessToken = async (payload) => {
  try {
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "1h", // Thêm thời gian hết hạn nếu cần
    });
    return token;
  } catch (error) {
    throw new Error("Failed to generate token: " + error.message);
  }
};

module.exports = { getAccessToken };
