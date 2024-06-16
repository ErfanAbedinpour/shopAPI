const mongoose = require("mongoose");
require("dotenv").config();

const schema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    userName: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true },
);

const concat = mongoose.model("concat", schema);

module.exports = concat;
