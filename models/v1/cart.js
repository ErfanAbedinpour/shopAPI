require("dotenv").config();
const mongoose = require("mongoose");

//Create CartModel

const cartSchema = new mongoose.Schema(
  {
    products: [
      {
        productId: { type: mongoose.Types.ObjectId, red: "Product" },
        quantity: Number,
      },
    ],
    user: { type: mongoose.Types.ObjectId, ref: "User" },
    totalPrice: { type: String, required: true },
  },
  { timestamps: true },
);

const cart = mongoose.model("Cart", cartSchema);

module.exports = cart;
