const { Router } = require("express");
const homeController = require("./home.controller.js");
const router = Router();

router.route("/").get(homeController.main);

module.exports = router;
