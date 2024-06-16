const sessinModel = require("../models/v1/session.Model");

const isLogin = async function (req, res, next) {
  try {
    const sessionID = req.cookies?.sessionID;
    const isSessionIDValid =
      sessionID && (await sessinModel.isSessionValid(sessionID));
    if (!sessionID || !isSessionIDValid) {
      return next();
    }
    req.user = isSessionIDValid;
    res.redirect("/");
  } catch (error) {
    next(error);
  }
};

module.exports = isLogin;
