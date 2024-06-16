const { Router } = require("express");
const controller = require("./mail.controller");
const validator = require("./../../../middlewares/validator.middleware");
const authMiddlewares = require("../../../middlewares/authMiddlewares");
const validatorPattern = require("./mail.validator");

const router = Router();

router
  .route("/")
  .get(
    authMiddlewares.authUser,
    authMiddlewares.isAdminUser,
    controller.showEmails,
  )
  .post(validator(validatorPattern.sendMail), controller.sendMail);

router
  .route("/:id")
  .delete(
    authMiddlewares.authUser,
    authMiddlewares.isAdminUser,
    controller.deleteMail,
  )
  .post(
    authMiddlewares.authUser,
    authMiddlewares.isAdminUser,
    controller.sendAnswer,
  );

module.exports = router;
