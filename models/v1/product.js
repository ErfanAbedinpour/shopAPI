require("dotenv").config();
const mongoose = require("mongoose");

//Create User model
const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    model: { type: String, required: true },
    describe: { type: String, required: true },
    price: { type: String, required: true },
    user: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
    invent: { type: Number, default: 1 },
    image: {
      fileName: { type: String },
    },
    categorie: {
      type: String,
      enums: ["computer", "graphic", "accounting"],
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  },
  {
    timestamps: true,
  },
);

ProductSchema.virtual("comments", {
  ref: "comment",
  localField: "_id",
  foreignField: "product",
});

ProductSchema.virtual("views", {
  ref: "views",
  localField: "_id",
  foreignField: "product",
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
