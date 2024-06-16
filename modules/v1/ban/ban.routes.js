const { Router } = require("express");
const controller = require("./ban.conroller");
const isAdmin = require("../../../middlewares/isAdmin");
const isLoginUser = require("../../../middlewares/isLogin.js");

const router = Router();

router.route("/").get(isLoginUser, isAdmin, controller.banList);

router
  .route("/:id")
  .delete(isLoginUser, isAdmin, controller.unBan)
  .post(isLoginUser, isAdmin, controller.ban);
module.exports = router;
