const sessinModel = require("../models/v1/session.Model");
const response = require("../utils/response/response");

exports.checkUserStillSingin = async function (req, res, next) {
  try {
    const sessionID = req.cookies.sessionID;
    const isSessionIDValid = await sessinModel.isSessionValid(sessionID);
    if (!sessionID || !isSessionIDValid) {
      return next();
    }
    req.user = isSessionIDValid;
    res.redirect("/");
  } catch (error) {
    next(error);
  }
};

exports.getRole = function (req, res, next) {
  if (req.user.role === "ADMIN") {
    return next();
  }
  return response.errorResponse(
    res,
    404,
    "route is protect",
    "you connot access to this route",
  );
};
