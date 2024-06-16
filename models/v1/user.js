const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
//Create User model
const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["ADMIN", "USER"], default: "USER" },
    isBan: { type: Boolean, default: false },
    profile: {
      fileName: { type: String },
    },
  },
  {
    timestamps: true,
  },
);

//hash password before saving to database
userSchema.pre("save", async function (next) {
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (err) {
    next(err);
  }
});
//compare password
userSchema.static.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (err) {
    throw new Error(err);
  }
};

//Create User model
const User = mongoose.model("User", userSchema);
//export User model2020

module.exports = User;
