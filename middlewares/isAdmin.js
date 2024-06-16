const isAdmin = function (req, res, next) {
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

module.exports = isAdmin;
