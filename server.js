//Modules
const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const session = require("express-session");
//Main
const app = express()
  .use(express.urlencoded({ extended: false }))
  .use(express.json());
//Midlewares
app.use(cookieParser());
app.use(
  session({
    secret: "EMAM",
    resave: false,
    saveUninitialized: true,
  }),
);
app.use(morgan("dev"));
//helper
const response = require("./utils/response/response");
//RouterFile
const authRouter = require("./modules/v1/auth/auth.routes");
const adminRouter = require("./modules/v1/admin/admin.routes");
const banRouter = require("./modules/v1/ban/ban.routes");
const homeRouter = require("./modules/v1/home/home.routes.js");
//routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/", adminRouter);
app.use("/api/v1/ban", banRouter);
app.use("/api/v1/", homeRouter);
//404 Page
app.use((_, res) => {
  response.errorResponse(res, 404, "not found", "this route is not found");
});

//error middlewares
app.use(function (err, _, res, __) {
  if (err) return response.errorResponse(res, 500, err.code, err.message);
});

module.exports = app;
