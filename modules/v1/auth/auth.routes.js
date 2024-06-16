//Auth Router
//modules
const { Router } = require("express");
const authController = require("./auth.controller");
const validator = require("../../../middlewares/validator.middleware");
const validatorPattern = require("./auth.validator");
const isLoginUser = require("../../../middlewares/isLogin");
//router
const router = Router();
//middlewares
router.use(isLoginUser);
//login route
router
  .route("/login")
  .post(validator(validatorPattern.login), authController.login);
//singUp route
router
  .route("/singUp")
  .post(validator(validatorPattern.singUp), authController.singUp);

//resetPassword and change passwrod router
router.route("/forget-password").post(authController.forgetPassword);
router
  .route("/change-password")
  .post(
    validator(validatorPattern.changePassword),
    authController.changePassword,
  );
//exports
module.exports = router;
