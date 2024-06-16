require("dotenv").config();
const mongoose = require("mongoose");
const JDate = require("jalali-date");

//Create User model

const commentSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    user: { type: mongoose.Types.ObjectId, ref: "User" },
    date: {
      type: String,
      default: new JDate().format("dddd DD MMMM YYYY"),
    },
    parent: { type: mongoose.Types.ObjectId, ref: "comment" },
    product: { type: mongoose.Types.ObjectId, ref: "Product", required: true },
  },
  {
    timestamps: true,
  },
);

const Comment = mongoose.model("comment", commentSchema);

module.exports = Comment;
