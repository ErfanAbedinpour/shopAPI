const productModel = require("../../../models/v1/product");
const response = require("../../../utils/response/response");
const userModel = require("../../../models/v1/user");
const Product = require("../../../models/v1/product");

// //show all product
// exports.showAllProduct = async (req,res,next)=>{
//   try {
//   } catch (error) {
//     next(error);
//   }
// }

//add product
exports.addProduct = async (req, res, next) => {
  try {
    const { title, model, describe, price, invent, categorie } = req.body;
    const image = req.file.image.filename;
    const result = await productModel.create({
      title,
      model,
      describe,
      price,
      invent,
      image,
      categorie,
      user: req.user._id,
    });
  } catch (error) {
    next(error);
  }
};
