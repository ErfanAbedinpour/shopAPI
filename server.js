//Modules
const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const session = require("express-session");
const auth = require("./middlewares/authMiddlewares");
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
const adminRoutes = require("./modules/v1/admin/admin.routes");
const mailRouter = require("./modules/v1/mail/mail.routes");
const banRouter = require("./modules/v1/ban/ban.routes");
//routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/", adminRoutes);
app.use("/api/v1/mail", mailRouter);
app.use("/api/v1/ban", banRouter);
//404 Page
app.use((req, res) => {
  response.errorResponse(res, 404, "not found", "this route is not found");
});

//error middlewares
app.use(function (err, req, res, next) {
  if (err) return response.errorResponse(res, 500, err.code, err.message);
});

module.exports = app;
