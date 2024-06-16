//Auth controller Login Handler
const crypto = require("crypto");
const userModel = require("../../../models/v1/user");
const bcrypt = require("bcrypt");
const sessionModel = require("../../../models/v1/session.Model");
const jsonwebtoken = require("jsonwebtoken");
const sendMail = require("../../../utils/helper/sendMail");
const resetPasswordModel = require("../../../models/v1/resetPassword");
const response = require("../../../utils/response/response");
require("dotenv").config();

//singUp Logic
exports.singUp = async (req, res, next) => {
  try {
    //Get ReqBody
    const { email, userName, password } = req.body;
    const isUserExsist = await userModel.findOne({ email });
    if (isUserExsist) {
      return response.errorResponse(
        res,
        409,
        "error",
        "user is already have account",
      );
    }
    //register here
    const countOfDoc = await userModel.countDocuments();
    await userModel.create({
      userName: userName,
      password: password,
      email: email,
      role: countOfDoc === 0 ? "ADMIN" : "USER",
    });
    //send response
    return response.successResponse(res, 201, {
      code: "success",
      msg: "User created successfully",
    });
  } catch (err) {
    response.errorResponse(res, 500, "error", err.message);
  }
};
//Login Controller
exports.login = async (req, res, next) => {
  //Sending Response
  try {
    //get body
    const { email, password } = req.body;
    //get user
    const user = await userModel
      .findOne({ email })
      .select("-createdAt -updatedAt -__v");
    //validation user
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return response.errorResponse(
        res,
        401,
        "error",
        "email or password incorrect",
      );
    }
    if (user.isBan) {
      return response.errorResponse(res, 403, "error", "you banned from admin");
    }
    //create SessionID token and save on cookie
    const sessionID = await sessionModel.generateSession(user);
    res.cookie("sessionID", sessionID, {
      httpOnly: true,
      maxAge: Date.now() + 60 * 60 * 24 * 10 * 1000,
    });
    //conver user to object for delete some prop
    const userObj = user.toObject();
    Reflect.deleteProperty(userObj, "password");
    //send response
    response.successResponse(res, 200, {
      code: "success",
      user: {
        user: userObj,
      },
      sessionID: sessionID,
    });
  } catch (err) {
    next(err);
  }
};
//resetPassword
exports.forgetPassword = async (req, res, next) => {
  try {
    const { randomBytes } = await require("crypto");
    const { email } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return response.errorResponse(res, 401, "error", "user does not exsist");
    }
    await resetPasswordModel.findOneAndDelete({
      user: user._id,
    });
    const token = randomBytes(20).toString("hex");
    await resetPasswordModel.create({
      token,
      user: user._id,
      expireTime: new Date(
        Date.now() +
          process.env["RESET_PASSWORD_EXPIRE_TIME"] * 1 * 60 * 60 * 1000,
      ),
    });
    if (
      await sendMail(
        email,
        "reset password link",
        "change password",
        `${token}`,
      )
    ) {
      return response.successResponse(res, 200, {
        code: "success",
        msg: "reset link sended successfully",
      });
    } else {
      return response.errorResponse(res, 400, "faild", "faild to send link");
    }
  } catch (e) {
    next(e);
  }
};
//change password
exports.changePassword = async (req, res, next) => {
  try {
    const { token, password } = req.body;
    const findUserWithToken = await resetPasswordModel.findOne({ token });
    if (!findUserWithToken) {
      return response.errorResponse(res, 400, "error", "url is expired");
    }
    const resultToChange = await userModel.findByIdAndUpdate(
      findUserWithToken.user,
      {
        $set: { password },
      },
    );
    if (resultToChange) {
      const deleteResult = await resetPasswordModel.deleteOne({ token });
      if (deleteResult) {
        return response.successResponse(res, 202, {
          code: "success",
          msg: "password change succesfully",
        });
      }
    }
    return response.errorResponse(res, 400, "error", "change faild");
  } catch (err) {
    next(err);
  }
};
//generate AccessToken
exports.accessToken = async function (req, res, next) {
  try {
    const { token } = req.body;
    const user = await refreshTokenModel.verifyToken(token);
    if (!user) {
      return response.errorResponse(
        res,
        401,
        "not found",
        "please login again token is expire",
      );
    }
    const accessToken = jsonwebtoken.sign(
      { id: user._id },
      process.env["JWT_SECRET"],
      {
        expiresIn: process.env["ACCESS_TOKEN_EXPIRE"],
      },
    );
    return response.successResponse(res, 201, { accessToken });
  } catch (e) {
    next(e);
  }
};
