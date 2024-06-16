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
schema.statics.generateSession = async function (user) {
  try {
    let session = "";
    do {
      session = crypto.randomBytes(20).toString("hex");
    } while (await model.findOne({ session }));
    const result = await model.create({
      session,
      user: user._id,
      expireTime: 24 * 7 * 60 * 60 * 1000 + Date.now(),
    });
    if (!result) throw new Error("faild to saved in DB");
    return session;
  } catch (error) {
    throw new Error(error.message);
  }
};
// verify sessionID
schema.statics.isSessionValid = async function (session) {
  const sessionID = await model.findOne({ session });
  if (!sessionID || sessionID.expireTime < Date.now()) {
    return false;
  }
  return sessionID.user;
};

const model = mongoose.model("sessions", schema);
module.exports = model;
