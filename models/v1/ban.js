require("dotenv").config();
const mongoose = require("mongoose");

const banSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const banModel = mongoose.model("ban", banSchema);

module.exports = banModel;
