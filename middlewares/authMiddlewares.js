const jwt = require("jsonwebtoken");
const userModel = require("../models/v1/user");
const { successResponse } = require("../utils/response/response");

exports.authUser = async function(req, res, next) {
    try {
        const token = req.cookies["accessToken"] || undefined;
        if (!token) {
            res.status(401);
            return res.json({
                status: false,
                msg: "please login:((",
            });
        }
        const { id } = jwt.verify(token, process.env["JWT_SECRET"]);
        const user = await userModel.findById(id);
        if (!user) {
            res.status(402);
            return res.json({
                status: false,
                msg: "user not found please login again",
            });
        }
        req.user = user;
        next();
    } catch (e) {
        next(e);
    }
};

exports.isAdminUser = async function(req, res, next) {
    try {
        if (req.user.role !== "ADMIN")
            return successResponse(res, 400, "you cant access to this route");
        next();
    } catch (e) {
        next(e);
    }
};
