const { Router } = require("express");
const controller = require("./admin.controller");
const validator = require("../../../middlewares/validator.middleware");
const singUpValidatorPattern = require("../auth/auth.validator");
const authMiddleware = require("../../../middlewares/authMiddlewares");

const router = Router();

router
  .route("/")
  .get(
    authMiddleware.authUser,
    authMiddleware.isAdminUser,
    controller.showUsers,
  )
  .post(
    authMiddleware.authUser,
    authMiddleware.isAdminUser,
    validator(singUpValidatorPattern.singUp),
    controller.addUser,
  );

router.delete(
  "/:id",
  authMiddleware.authUser,
  authMiddleware.isAdminUser,
  controller.remove,
);

router
  .route("/users")
  .get(authMiddleware.authUser, authMiddleware.isAdminUser, controller.search);

module.exports = router;
