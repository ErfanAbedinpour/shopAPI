const banModel = require("../../../models/v1/ban");
const userModel = require("../../../models/v1/user");
const response = require("../../../utils/response/response");

//ban user
exports.ban = async (req, res) => {
  const { id } = req.params;
  if (req.user._id.toString() == id) {
    res.status(401);
    return response.errorResponse(res, 401, "you cant not unban yourself");
  }
  const user = await userModel.findByIdAndUpdate(id, {
    $set: { isBan: true },
  });
  if (!user)
    return response.errorResponse(res, 402, "error", "user does not found");
  await banModel.create({
    user: user._id,
  });
  return response.successResponse(
    res,
    201,
    `${user.userName} ban successfully`,
  );
};
//unban User
exports.unBan = async (req, res) => {
  const { id } = req.params;
  if (req.user._id.toString() == id) {
    res.status(401);
    return response.errorResponse(res, 401, "you cant not unban yourself");
  }
  const user = await userModel.findByIdAndUpdate(id, {
    $set: { isBan: false },
  });
  if (!user) return response.errorResponse(res, 402, "error", "user not found");
  await banModel.deleteOne({
    user: user._id,
  });
  response.successResponse(res, 201, `${user.userName} unban successfully`);
};

//ban list
exports.banList = async function(req, res, next) {
  try {
    const banList = await banModel
      .find({}, "-createdAt -updatedAt -__v")
      .populate("user", "-createdAt -updatedAt -__v -password");
    response.successResponse(res, 200, { banList });
  } catch (e) {
    next(e);
  }
};
