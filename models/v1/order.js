const mongoose = require("mongoose");
const JDate = require("jalali-date");
require("dotenv").config();

const schema = new mongoose.Schema(
  {
    method: { type: String, enums: ["home", "Bank"], default: "home" },
    concat: { type: mongoose.Types.ObjectId, ref: "concat", required: true },
    cart: {
      type: mongoose.Types.ObjectId,
      ref: "Cart",
    },
    orderDate: {
      type: String,
      default: new JDate().format("dddd DD MMMM YYYY"),
    },
    user: { type: mongoose.Types.ObjectId, ref: "User" },
    products: {
      type: [{ type: mongoose.Types.ObjectId, ref: "Product", required: true }],
    },
  },
  { timestamps: true },
);

const order = mongoose.model("order", schema);
module.exports = order;
