const { Router } = require("express");
const controller = require("./admin.controller");
const validator = require("../../../middlewares/validator.middleware");
const isLoginUser = require("../../../middlewares/isAdmin");
const isAdmin = require("../../../middlewares/isAdmin");
const authValidator = require("../auth/auth.validator");
const router = Router();

router
  .route("/")
  .get(isLoginUser, isAdmin, controller.showUsers)
  .post(
    isLoginUser,
    isAdmin,
    validator(authValidator.singUp),
    controller.addUser,
  );

router.delete("/:id", isLoginUser, isAdmin, controller.remove);

router.route("/users").get(isLoginUser, isAdmin, controller.search);

module.exports = router;
