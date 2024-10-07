const mongoose = require("mongoose");
const { Schema } = mongoose;
const crypto = require("crypto");
const PersonSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: { type: String },
  rule: { type: Number, default: 1 },
  createAt: {
    type: Date,
    default: Date.now,
  },
  updateAt: {
    type: Date,
    default: Date.now,
  },
  publicKey: {
    type: String,
    required: true,
  },
  privateKey: {
    type: String,
    required: true,
  },
});
// PersonSchema.pre("save", function (next) {
//   const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
//     modulusLength: 2048,
//   });
//   this.publicKey = publicKey.export({ type: "spki", format: "pem" });
//   this.privateKey = privateKey.export({ type: "pkcs8", format: "pem" });

//   this.updateAt = Date.now();
//   next();
// });
const UserModel = mongoose.model("Persons", PersonSchema);
module.exports = UserModel;
