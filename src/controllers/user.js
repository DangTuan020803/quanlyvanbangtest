const UserModel = require("../models/usermodel");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { getAccessToken } = require("../utils/getAccessToken");
const register = async (req, res) => {
  const body = req.body;
  const { email, password, confirmpassword } = body;
  console.log(email, password);
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      throw new Error("Tài khoản đã tồn tại");
    }
    if (password !== confirmpassword) {
      throw new Error("Mật khẩu và mật khẩu xác nhận không khớp");
    }
    // Mã hóa mật khẩu trước khi đưa vào database
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);

    // Tạo cặp khóa RSA (public key và private key)
    const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
      modulusLength: 2048,
    });
    // Gán các giá trị vào người dùng mới
    body.password = hashpassword;
    body.publicKey = publicKey.export({ type: "spki", format: "pem" });
    body.privateKey = privateKey.export({ type: "pkcs8", format: "pem" });
    //cập nhật lại user
    const newUser = new UserModel(body);

    // Tạo token và lưu token vào CSDL (nếu cần)
    const token = await getAccessToken({
      _id: newUser._id,
      email: newUser.email,
      rule: 1,
    });

    // Cập nhật lại token cho người dùng trong CSDL
    newUser.token = token;
    // Xóa thông tin mật khẩu và khóa bí mật trước khi trả dữ liệu về
    delete newUser.password;
    delete newUser.privateKey;
    await newUser.save();

    res.status(200).json({
      message: "Register",
      data: {
        ...newUser._doc,
        token,
      },
    });
  } catch (error) {
    // res.status(404).json({ message: error.message });
    res.status(404).json({ message: error.message });
  }
};
const login = async (req, res) => {
  const body = req.body;
  const { username, password } = body;
  console.log(username, password);
  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      throw new Error("Tài khoản không tồn tại");
    }
    // // Kiểm tra mật khẩu
    // const isMatch = await bcrypt.compare(password, user.password);
    // if (!isMatch) {
    //   throw new Error("Mật khẩu không chính xác");
    // }
    // Xóa thông tin mật khẩu và khóa bí mật trước khi trả dữ liệu về
    delete user._doc.password;
    const token = await getAccessToken({
      _id: user._id,
      username: user.username,
      rule: user.rule ?? 1,
    });
    res.status(200).json({
      message: "Login successful",
      data: {
        ...user._doc,
        token,
      },
    });
  } catch (error) {
    // res.status(404).json({ message: error.message });
    res.status(404).json({ message: error.message });
  }
};
module.exports = { register, login };
