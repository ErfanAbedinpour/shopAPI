const mongoose = require("mongoose");

//Create User model

const mailBox = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    text: { type: String, required: true },
    email: { type: String, required: true },
    isAnswer: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

const mail = mongoose.model("mail", mailBox);

module.exports = mail;
