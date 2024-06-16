const mongoose = require("mongoose");
const crypto = require("crypto");
const schema = new mongoose.Schema({
  session: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  expireTime: {
    type: Date,
    required: true,
  },
});

//generate sesssion ID
schema.statics.generateSession = async function (id) {
  try {
    const session = crypto.randomBytes(20).toString("hex");
    await model.create({
      session,
      user: id,
      expireTime: 24 * 7 * 60 * 60 * 1000 + date.now(),
    });
  } catch (error) {
    throw new Error(error.message);
  }
};
// verify sessionID
schema.statics.isSessionValid = async function (session) {
  const session = await model.findOne({ session });
  if (!session || session.expireTime < Date.now()) {
    return false;
  }
  return session.user;
};

const model = mongoose.model("refreshToken", schema);
module.exports = model;
