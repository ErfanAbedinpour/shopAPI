const { Router } = require("express");
const controller = require("./ban.conroller");
const authMiddleware = require("../../../middlewares/authMiddlewares");

const router = Router();

router
  .route("/")
  .get(authMiddleware.authUser, authMiddleware.isAdminUser, controller.banList);

router
  .route("/:id")
  .delete(authMiddleware.authUser, authMiddleware.isAdminUser, controller.unBan)
  .post(authMiddleware.authUser, authMiddleware.isAdminUser, controller.ban);
module.exports = router;
