const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  blog: { type: mongoose.Types.ObjectId, ref: "Blog" },
  product: { type: mongoose.Types.ObjectId, ref: "Product" },
});

const model = new mongoose.Model("views", schema);
module.exports = model;
